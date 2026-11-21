import React, { useEffect, useId, useRef, useState } from 'react';
import { fields } from '@keystatic/core';
import { cropImageStyle, panCrop, readCrop } from '../lib/photo.js';
import type { PhotoFormat } from './photo-formats';
import './photo-field.css';

type Options = { directory: string; publicPath: string; formats: PhotoFormat[]; gallery?: boolean; compact?: boolean };
// ObjectField.Input receives Keystatic's field preview props. Keeping native field
// schemas preserves asset storage, validation, and cloud collaboration behavior.
type FieldProps = { fields: Record<string, any>; onChange: (value: any) => void; autoFocus?: boolean; forceValidation?: boolean };

export function photoField(options: Options) {
  const schema = fields.object({
    image: fields.image({ label: 'Photo', directory: options.directory, publicPath: options.publicPath }),
    crops: fields.object(Object.fromEntries(options.formats.map(format => [format.key, fields.object({
      x: fields.number({ label: 'Position horizontale', defaultValue: 50, validation: { isRequired: true, min: 0, max: 100 } }),
      y: fields.number({ label: 'Position verticale', defaultValue: 50, validation: { isRequired: true, min: 0, max: 100 } }),
      zoom: fields.number({ label: 'Zoom', defaultValue: 1, validation: { isRequired: true, min: 1, max: 3 } }),
    })]))),
    ...(options.gallery ? { wide: fields.checkbox({ label: 'Utiliser le format large dans la galerie', defaultValue: false }) } : {}),
  }, { label: 'Photo et cadrage' });
  return { ...schema, Input: (props: unknown) => <PhotoInput {...props as FieldProps} options={options} /> };
}

function PhotoInput(props: FieldProps & { options: Options }) {
  const { options } = props;
  const [editing, setEditing] = useState(!props.options.compact);
  const [formatKey, setFormatKey] = useState(options.formats[0].key);
  const [mobile, setMobile] = useState(false);
  const [source, setSource] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [dragging, setDragging] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const naturalSize = useRef({ width: 0, height: 0 });
  const drag = useRef<any>(null);
  const id = useId();
  const data = props.fields.image.value?.data;
  useEffect(() => {
    setLoaded(false); setError(false);
    if (!data || !editing) { setSource(''); return; }
    const url = URL.createObjectURL(new Blob([new Uint8Array(data)]));
    setSource(url);
    return () => URL.revokeObjectURL(url);
  }, [data, editing]);
  const format = options.formats.find(item => item.key === formatKey) ?? options.formats[0];
  const cropField = props.fields.crops.fields[format.key];
  const crop = readCrop(Object.fromEntries(Object.entries(cropField.fields).map(([key, value]: [string, any]) => [key, value.value])));
  const aspect = options.gallery ? (props.fields.wide.value ? 16 / 10 : 4 / 5) : mobile && format.mobileAspect ? format.mobileAspect : format.aspect;
  const NativeImage = props.fields.image.schema.Input;
  const NativeWide = props.fields.wide?.schema.Input;
  const changeImage = (image: unknown) => {
    setEditing(true);
    props.onChange({ image, crops: Object.fromEntries(options.formats.map(item => [item.key, { x: 50, y: 50, zoom: 1 }])) });
  };
  const move = (initial: typeof crop, dx: number, dy: number, size: { width: number; height: number }) => {
    if (loaded) cropField.onChange(panCrop(initial, dx, dy, size, naturalSize.current));
  };
  return <section className="kf-photo" aria-label="Photo et cadrage">
    <NativeImage {...props.fields.image} autoFocus={props.autoFocus} forceValidation={props.forceValidation} onChange={changeImage} />
    {NativeWide && <NativeWide {...props.fields.wide} autoFocus={false} forceValidation={props.forceValidation} />}
    {!data ? <p className="kf-photo-help">Ajoutez une photo pour la cadrer ici.</p> : <>
      {options.compact && <button type="button" aria-expanded={editing} onClick={() => setEditing(!editing)}>{editing ? 'Masquer le cadrage' : 'Ajuster le cadrage'}</button>}
      {editing && <><div className="kf-photo-heading">
        {options.formats.length > 1 ? <label htmlFor={`${id}-format`}>Affichage à régler
          <select id={`${id}-format`} aria-label="Affichage à régler" value={format.key} onChange={event => { setFormatKey(event.target.value); setMobile(false); }}>
            {options.formats.map(item => <option key={item.key} value={item.key}>{item.label}</option>)}
          </select>
        </label> : <strong>{options.gallery ? 'Aperçu de la galerie' : format.label}</strong>}
        {format.mobileAspect && <div className="kf-photo-devices" role="group" aria-label="Version de l’aperçu">
          <button type="button" aria-pressed={!mobile} onClick={() => setMobile(false)}>Ordinateur</button>
          <button type="button" aria-pressed={mobile} onClick={() => setMobile(true)}>Mobile</button>
        </div>}
      </div>
      <p id={`${id}-help`} className="kf-photo-help">Déplacez la photo dans le cadre. Vous pouvez aussi utiliser les flèches du clavier et le zoom.</p>
      <div className="kf-photo-stage">
        <div ref={frame} className="kf-photo-frame" tabIndex={loaded ? 0 : -1} role="group" aria-label={`Cadrer : ${format.label}`} aria-describedby={`${id}-help`} aria-busy={!loaded && !error}
          data-dragging={dragging} style={{ aspectRatio: String(aspect), width: `min(100%, ${Math.min(480, 360 * aspect)}px)` }}
          onPointerDown={event => {
            if (!loaded || (event.pointerType === 'mouse' && event.button !== 0)) return;
            event.preventDefault(); event.currentTarget.focus(); event.currentTarget.setPointerCapture(event.pointerId);
            drag.current = { x: event.clientX, y: event.clientY, crop, size: event.currentTarget.getBoundingClientRect() };
            setDragging(true);
          }}
          onPointerMove={event => { if (drag.current) move(drag.current.crop, event.clientX - drag.current.x, event.clientY - drag.current.y, drag.current.size); }}
          onPointerUp={() => { drag.current = null; setDragging(false); }}
          onPointerCancel={() => { drag.current = null; setDragging(false); }}
          onLostPointerCapture={() => { drag.current = null; setDragging(false); }}
          onKeyDown={event => {
            const amount = event.shiftKey ? 20 : 5;
            const directions: Record<string, [number, number]> = { ArrowLeft: [-amount, 0], ArrowRight: [amount, 0], ArrowUp: [0, -amount], ArrowDown: [0, amount] };
            if (directions[event.key] && frame.current) { event.preventDefault(); move(crop, ...directions[event.key], frame.current.getBoundingClientRect()); }
          }}>
          {source && <img src={source} alt="" draggable={false} style={cropImageStyle(crop)} onLoad={event => {
            naturalSize.current = { width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight }; setLoaded(true);
          }} onError={() => { setError(true); setLoaded(false); }} />}
          {loaded && <div className="kf-photo-grid" aria-hidden="true"><i /><i /><i /><i /></div>}
          {!loaded && <span className="kf-photo-loading" role="status">{error ? 'Impossible de lire cette photo. Essayez une image JPG, PNG ou WebP.' : 'Chargement de la photo…'}</span>}
        </div>
      </div>
      <div className="kf-photo-tools">
        <label htmlFor={`${id}-zoom`}>Zoom
          <input id={`${id}-zoom`} type="range" min="1" max="3" step="0.01" value={crop.zoom} disabled={!loaded} onChange={event => cropField.onChange({ ...crop, zoom: Number(event.target.value) })} />
        </label>
        <button type="button" disabled={!loaded} onClick={() => cropField.onChange({ x: 50, y: 50, zoom: 1 })}>Recentrer</button>
      </div>
      <p className="kf-photo-help">L’aperçu se met à jour immédiatement. Enregistrez la fiche pour conserver vos cadrages.</p></>}
    </>}
  </section>;
}
