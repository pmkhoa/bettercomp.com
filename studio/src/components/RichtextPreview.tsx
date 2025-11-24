import { PortableText } from '@portabletext/react';

export default function RichtextPreview({ value }) {
  const { columnContent, richTextType } = value;

  console.log('----------debugging: column content----------');
  console.log(columnContent);

  return (
    <div style={{ padding: '12px', border: '1px solid #eee', borderRadius: '6px' }}>
      <strong>Richtext ({richTextType})</strong>

      {columnContent && (
        <div style={{ marginTop: '8px', opacity: 0.8 }}>
          <PortableText value={columnContent.slice(0, 2)} />
        </div>
      )}

      {!columnContent && <p style={{ opacity: 0.5 }}>No content</p>}
    </div>
  );
}
