import cleancss from 'clean-css';
import { EleventyHtmlBasePlugin } from '@11ty/eleventy';

const LAYOUT_ALIASES = {
  base: 'layouts/base.html',
  document: 'layouts/document.html',
  home: 'layouts/home.html',
  page: 'layouts/page.html',
};

const PASSTHROUGH_COPIES = [
  ['static', 'static'],
  [{ 'src/_data/api': 'api' }],
  [{ 'src/js': 'js' }],
  [{ 'node_modules/mirador/dist': 'js/mirador' }],
];

export default function configureEleventy(eleventyConfig) {
  eleventyConfig.setIncludesDirectory('_templates');
  eleventyConfig.setInputDirectory('src');
  eleventyConfig.setOutputDirectory('dist');

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addFilter(
    'cssmin',
    (code) => new cleancss({}).minify(code).styles,
  );
  eleventyConfig.addFilter('jsonify', (data) =>
    JSON.stringify(data, null, '\t'),
  );
  eleventyConfig.addFilter('uri_encode', (value) => encodeURIComponent(value));
  eleventyConfig.addFilter('title_display', (value) => {
    if (!value) return '';

    return value
      .replaceAll('_', ' ')
      .replace(
        /\w\S*/g,
        (word) => word[0].toUpperCase() + word.slice(1).toLowerCase(),
      );
  });
  eleventyConfig.addFilter('contains', (text, value) => {
    return Boolean(text && value && text.includes(value));
  });

  Object.entries(LAYOUT_ALIASES).forEach(([name, path]) => {
    eleventyConfig.addLayoutAlias(name, path);
  });

  PASSTHROUGH_COPIES.forEach((args) =>
    eleventyConfig.addPassthroughCopy(...args),
  );

  return {
    pathPrefix: '/digital-text-explorer',
    markdownTemplateEngine: 'liquid',
  };
}
