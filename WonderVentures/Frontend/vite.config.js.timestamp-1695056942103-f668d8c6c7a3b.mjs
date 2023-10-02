// vite.config.js
import { defineConfig } from "file:///C:/Users/cveti/Desktop/WonderVentures(personal%20and%20testing)/WonderVentures/Frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/cveti/Desktop/WonderVentures(personal%20and%20testing)/WonderVentures/Frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react({
    // Add this line
    include: "**/*.jsx"
  })],
  define: {
    global: "globalThis"
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser"
    }
  },
  server: {
    watch: {
      usePolling: true
    },
    hmr: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      extensions: [".js", ".cjs"],
      strictRequires: true,
      transformMixedEsModules: true
    },
    chunkSizeWarningLimit: 1e8,
    sourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjdmV0aVxcXFxEZXNrdG9wXFxcXFdvbmRlclZlbnR1cmVzKHBlcnNvbmFsIGFuZCB0ZXN0aW5nKVxcXFxXb25kZXJWZW50dXJlc1xcXFxGcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcY3ZldGlcXFxcRGVza3RvcFxcXFxXb25kZXJWZW50dXJlcyhwZXJzb25hbCBhbmQgdGVzdGluZylcXFxcV29uZGVyVmVudHVyZXNcXFxcRnJvbnRlbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2N2ZXRpL0Rlc2t0b3AvV29uZGVyVmVudHVyZXMocGVyc29uYWwlMjBhbmQlMjB0ZXN0aW5nKS9Xb25kZXJWZW50dXJlcy9Gcm9udGVuZC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KHtcclxuICAgIC8vIEFkZCB0aGlzIGxpbmVcclxuICAgIGluY2x1ZGU6IFwiKiovKi5qc3hcIixcclxuICB9KV0sXHJcbiAgZGVmaW5lOiB7IFxyXG4gICAgZ2xvYmFsOiBcImdsb2JhbFRoaXNcIlxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJy4vcnVudGltZUNvbmZpZyc6ICcuL3J1bnRpbWVDb25maWcuYnJvd3NlcicsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgc2VydmVyOlxyXG4gIHtcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgIHVzZVBvbGxpbmc6IHRydWVcclxuICAgIH0sXHJcbiAgICBobXI6IHRydWVcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OntcclxuICAgICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29tbW9uanNPcHRpb25zOiB7XHJcbiAgICAgIGluY2x1ZGU6IFsvbm9kZV9tb2R1bGVzL10sXHJcbiAgICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy5janMnXSxcclxuICAgICAgc3RyaWN0UmVxdWlyZXM6IHRydWUsXHJcbiAgICAgIHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMDAwMDAwLFxyXG4gICAgc291cmNlbWFwOiB0cnVlLFxyXG59XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZiLFNBQVMsb0JBQW9CO0FBQzFkLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTTtBQUFBO0FBQUEsSUFFZCxTQUFTO0FBQUEsRUFDWCxDQUFDLENBQUM7QUFBQSxFQUNGLFFBQVE7QUFBQSxJQUNOLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxtQkFBbUI7QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQ0E7QUFBQSxJQUNFLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxLQUFLO0FBQUEsRUFDUDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ1gsUUFBTztBQUFBLFFBQ0gsYUFBYSxJQUFJO0FBQ2IsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQzdCLG1CQUFPLEdBQUcsU0FBUyxFQUFFLE1BQU0sZUFBZSxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUztBQUFBLFVBQzFFO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsSUFDQSxpQkFBaUI7QUFBQSxNQUNmLFNBQVMsQ0FBQyxjQUFjO0FBQUEsTUFDeEIsWUFBWSxDQUFDLE9BQU8sTUFBTTtBQUFBLE1BQzFCLGdCQUFnQjtBQUFBLE1BQ2hCLHlCQUF5QjtBQUFBLElBQzNCO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxJQUN2QixXQUFXO0FBQUEsRUFDZjtBQUNBLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
