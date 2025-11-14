type Props = {
  scripts: any[];
};

export default function ScriptInjections({ scripts }: Props) {
  return scripts.map((script, index) => {
    if (script.embedded_code) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: script.embedded_code }}
          key={index}
          data-script={script.script_name}
        />
      );
    }
    return null;
  });
}
