export function filterContent(content, role) {
  // Remove markers for socio (they see everything)
  if (role === 'socio') {
    return content
      .replace(/<!-- socio-only -->\n?/g, '')
      .replace(/<!-- \/socio-only -->\n?/g, '');
  }

  // Strip socio-only blocks for funcionario
  return content.replace(
    /<!-- socio-only -->[\s\S]*?<!-- \/socio-only -->\n?/g,
    ''
  );
}
