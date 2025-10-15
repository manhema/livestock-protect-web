
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    const importMap = {
      
        "@emotion/react": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild___mf_0_emotion_mf_1_react__prebuild__.js")
          return pkg
        }
      ,
        "@emotion/styled": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild___mf_0_emotion_mf_1_styled__prebuild__.js")
          return pkg
        }
      ,
        "@mui/icons-material": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild___mf_0_mui_mf_1_icons_mf_2_material__prebuild__.js")
          return pkg
        }
      ,
        "@mui/material": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild___mf_0_mui_mf_1_material__prebuild__.js")
          return pkg
        }
      ,
        "@mui/x-date-pickers": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild___mf_0_mui_mf_1_x_mf_2_date_mf_2_pickers__prebuild__.js")
          return pkg
        }
      ,
        "@tanstack/react-query": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild___mf_0_tanstack_mf_1_react_mf_2_query__prebuild__.js")
          return pkg
        }
      ,
        "@vis.gl/react-google-maps": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild___mf_0_vis_mf_3_gl_mf_1_react_mf_2_google_mf_2_maps__prebuild__.js")
          return pkg
        }
      ,
        "chart.js": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__chart_mf_3_js__prebuild__.js")
          return pkg
        }
      ,
        "dayjs": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__dayjs__prebuild__.js")
          return pkg
        }
      ,
        "fuse.js": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__fuse_mf_3_js__prebuild__.js")
          return pkg
        }
      ,
        "html2canvas": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__html2canvas__prebuild__.js")
          return pkg
        }
      ,
        "qrcode.react": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__qrcode_mf_3_react__prebuild__.react")
          return pkg
        }
      ,
        "react": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__react__prebuild__.js")
          return pkg
        }
      ,
        "react-chartjs-2": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__react_mf_2_chartjs_mf_2_2__prebuild__.js")
          return pkg
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__react_mf_2_dom__prebuild__.js")
          return pkg
        }
      ,
        "react-hook-form": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__react_mf_2_hook_mf_2_form__prebuild__.js")
          return pkg
        }
      ,
        "react-markdown": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__react_mf_2_markdown__prebuild__.js")
          return pkg
        }
      ,
        "react-router": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__react_mf_2_router__prebuild__.js")
          return pkg
        }
      ,
        "zod": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__zod__prebuild__.js")
          return pkg
        }
      ,
        "zustand": async () => {
          let pkg = await import("__mf__virtual/remote__prebuild__zustand__prebuild__.js")
          return pkg
        }
      
    }
      const usedShared = {
      
          "@emotion/react": {
            name: "@emotion/react",
            version: "11.14.0",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["@emotion/react"].loaded = true
              const {"@emotion/react": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^11.14.0"
            }
          }
        ,
          "@emotion/styled": {
            name: "@emotion/styled",
            version: "11.14.1",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["@emotion/styled"].loaded = true
              const {"@emotion/styled": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^11.14.1"
            }
          }
        ,
          "@mui/icons-material": {
            name: "@mui/icons-material",
            version: "7.2.0",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["@mui/icons-material"].loaded = true
              const {"@mui/icons-material": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^7.2.0"
            }
          }
        ,
          "@mui/material": {
            name: "@mui/material",
            version: "7.2.0",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["@mui/material"].loaded = true
              const {"@mui/material": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^7.2.0"
            }
          }
        ,
          "@mui/x-date-pickers": {
            name: "@mui/x-date-pickers",
            version: "8.7.0",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["@mui/x-date-pickers"].loaded = true
              const {"@mui/x-date-pickers": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^8.7.0"
            }
          }
        ,
          "@tanstack/react-query": {
            name: "@tanstack/react-query",
            version: "5.81.5",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["@tanstack/react-query"].loaded = true
              const {"@tanstack/react-query": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^5.81.5"
            }
          }
        ,
          "@vis.gl/react-google-maps": {
            name: "@vis.gl/react-google-maps",
            version: "1.5.4",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["@vis.gl/react-google-maps"].loaded = true
              const {"@vis.gl/react-google-maps": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^1.5.4"
            }
          }
        ,
          "chart.js": {
            name: "chart.js",
            version: "4.5.0",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["chart.js"].loaded = true
              const {"chart.js": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^4.5.0"
            }
          }
        ,
          "dayjs": {
            name: "dayjs",
            version: "1.11.13",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["dayjs"].loaded = true
              const {"dayjs": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^1.11.13"
            }
          }
        ,
          "fuse.js": {
            name: "fuse.js",
            version: "7.1.0",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["fuse.js"].loaded = true
              const {"fuse.js": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^7.1.0"
            }
          }
        ,
          "html2canvas": {
            name: "html2canvas",
            version: "1.4.1",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["html2canvas"].loaded = true
              const {"html2canvas": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^1.4.1"
            }
          }
        ,
          "qrcode.react": {
            name: "qrcode.react",
            version: "4.2.0",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["qrcode.react"].loaded = true
              const {"qrcode.react": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^4.2.0"
            }
          }
        ,
          "react": {
            name: "react",
            version: "19.1.0",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.1.0"
            }
          }
        ,
          "react-chartjs-2": {
            name: "react-chartjs-2",
            version: "5.3.0",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["react-chartjs-2"].loaded = true
              const {"react-chartjs-2": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^5.3.0"
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "19.1.0",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^19.1.0"
            }
          }
        ,
          "react-hook-form": {
            name: "react-hook-form",
            version: "7.60.0",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["react-hook-form"].loaded = true
              const {"react-hook-form": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^7.60.0"
            }
          }
        ,
          "react-markdown": {
            name: "react-markdown",
            version: "10.1.0",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["react-markdown"].loaded = true
              const {"react-markdown": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^10.1.0"
            }
          }
        ,
          "react-router": {
            name: "react-router",
            version: "7.6.3",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["react-router"].loaded = true
              const {"react-router": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^7.6.3"
            }
          }
        ,
          "zod": {
            name: "zod",
            version: "3.25.76",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["zod"].loaded = true
              const {"zod": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^3.25.76"
            }
          }
        ,
          "zustand": {
            name: "zustand",
            version: "5.0.8",
            scope: ["default"],
            loaded: false,
            from: "remote",
            async get () {
              usedShared["zustand"].loaded = true
              const {"zustand": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^5.0.8"
            }
          }
        
    }
      const usedRemotes = [
      ]
      export {
        usedShared,
        usedRemotes
      }
      