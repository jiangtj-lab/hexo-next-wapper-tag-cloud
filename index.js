/* global hexo */

'use strict';

// load hexo-tag-cloud plugin
const tagcloud = hexo.resolvePlugin('hexo-tag-cloud')
hexo.loadPlugin(tagcloud).then(() => {
  hexo.log.debug('Plugin loaded: hexo-tag-cloud');
}).catch(err => {
  hexo.log.error({err}, 'Plugin load failed: hexo-tag-cloud');
});

hexo.extend.filter.register('theme_inject', injects => {
  injects.sidebar.raw('next-tag-cloud.ejs', `
  <% if (site.tags.length) { %>
    <script type="text/javascript" charset="utf-8" src="<%- url_for('/js/tagcloud.js') %>"></script>
    <script type="text/javascript" charset="utf-8" src="<%- url_for('/js/tagcanvas.js') %>"></script>
    <div class="widget-wrap">
      <div id="myCanvasContainer" class="widget tagcloud">
        <canvas id="resCanvas" style="width:100%">
          <%- tagcloud() %>
        </canvas>
      </div>
    </div>
  <% } %>
  `, {}, {cache: true})
});
