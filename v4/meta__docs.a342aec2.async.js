"use strict";(self.webpackChunkyapi_to_typescript=self.webpackChunkyapi_to_typescript||[]).push([[467],{36325:(function(d,e,a){a.r(e),a.d(e,{demos:function(){return t}});var n=a(30758),t={}}),62383:(function(d,e,a){a.r(e),a.d(e,{demos:function(){return t}});var n=a(30758),t={}}),94859:(function(d,e,a){a.r(e),a.d(e,{demos:function(){return t}});var n=a(30758),t={}}),50738:(function(d,e,a){a.r(e),a.d(e,{demos:function(){return t}});var n=a(30758),t={}}),58292:(function(d,e,a){a.r(e),a.d(e,{demos:function(){return t}});var n=a(30758),t={}}),14130:(function(d,e,a){a.r(e);const n=[{value:"YApi to TypeScript",paraId:0,tocIndex:0},{value:"\uFF08\u7B80\u79F0 ",paraId:0,tocIndex:0},{value:"ytt",paraId:0,tocIndex:0},{value:"\uFF09 \u662F\u4E00\u4E2A\u4EE3\u7801\u751F\u6210\u5DE5\u5177\uFF0C\u5176\u53EF\u6839\u636E ",paraId:0,tocIndex:0},{value:"YApi",paraId:0,tocIndex:0},{value:" \u6216 ",paraId:0,tocIndex:0},{value:"Swagger",paraId:0,tocIndex:0},{value:" \u7684\u63A5\u53E3\u5B9A\u4E49\u751F\u6210 TypeScript \u6216 JavaScript \u7684\u63A5\u53E3\u7C7B\u578B\u53CA\u5176\u8BF7\u6C42\u51FD\u6570\u4EE3\u7801\u3002",paraId:0,tocIndex:0},{value:"\u652F\u6301\u591A\u670D\u52A1\u5668\u3001\u591A\u9879\u76EE\u3001\u591A\u5206\u7C7B",paraId:1,tocIndex:1},{value:"\u652F\u6301\u9884\u5904\u7406\u63A5\u53E3\u4FE1\u606F",paraId:1,tocIndex:1},{value:"\u53EF\u81EA\u5B9A\u4E49\u7C7B\u578B\u6216\u51FD\u6570\u540D\u79F0",paraId:1,tocIndex:1},{value:"\u5B8C\u6574\u7684\u6CE8\u91CA",paraId:1,tocIndex:1},{value:"\u652F\u6301\u751F\u6210 React Hooks \u7684\u8BF7\u6C42\u4EE3\u7801",paraId:1,tocIndex:1},{value:"\u652F\u6301\u53C2\u6570\u8DEF\u5F84",paraId:1,tocIndex:1},{value:"\u652F\u6301\u4E0A\u4F20\u6587\u4EF6",paraId:1,tocIndex:1},{value:"\u652F\u6301\u751F\u6210 JavaScript \u4EE3\u7801",paraId:1,tocIndex:1},{value:"\u652F\u6301 Swagger",paraId:1,tocIndex:1},{value:"\u9996\u5148\u5F97\u6709 ",paraId:2,tocIndex:2},{value:"Node.js",paraId:2,tocIndex:2},{value:"\uFF0C\u5E76\u786E\u4FDD\u5176\u7248\u672C ",paraId:2,tocIndex:2},{value:">= 24.21.0",paraId:2,tocIndex:2},{value:"\uFF0C\u82E5\u7248\u672C\u8FC7\u4F4E\uFF0C\u53EF\u8003\u8651\u5347\u7EA7\u9879\u76EE\u57FA\u7840\u8BBE\u65BD\uFF0C\u6216\u5B89\u88C5V3\u7248\u672C\uFF0C\u5176 Node.js \u7248\u672C\u8981\u6C42\u4E3A ",paraId:2,tocIndex:2},{value:">= 10.19.0",paraId:2,tocIndex:2},{value:"\u3002\u540C\u65F6\uFF1A",paraId:2,tocIndex:2},{value:"\u5BF9\u4E8E\u57FA\u4E8E YApi \u7684\u9879\u76EE\uFF0C\u8981\u6C42 YApi \u7684\u7248\u672C\u5FC5\u987B ",paraId:3,tocIndex:2},{value:">= 1.5.12",paraId:3,tocIndex:2},{value:"\u3002",paraId:3,tocIndex:2},{value:"\u5BF9\u4E8E\u57FA\u4E8E Swagger \u7684\u9879\u76EE\uFF0C\u4EC5\u652F\u6301 ",paraId:3,tocIndex:2},{value:"Swagger 2",paraId:3,tocIndex:2},{value:" \u548C ",paraId:3,tocIndex:2},{value:"OpenAPI 3",paraId:3,tocIndex:2},{value:"\u3002",paraId:3,tocIndex:2},{value:"\u9009\u62E9\u4F60\u5E38\u7528\u7684\u5305\u7BA1\u7406\u5668\u5C06 ",paraId:4,tocIndex:3},{value:"yapi-to-typescript",paraId:4,tocIndex:3},{value:" \u52A0\u5165\u9879\u76EE\u4F9D\u8D56\u5373\u53EF\uFF1A",paraId:4,tocIndex:3},{value:`# npm
npm i yapi-to-typescript

# yarn
yarn add yapi-to-typescript

# pnpm
pnpm add yapi-to-typescript
`,paraId:5,tocIndex:3},{value:"\u5BF9\u4E8E\u4F4E\u7248\u672C Node.js\uFF1A",paraId:6,tocIndex:3},{value:`# npm
npm i yapi-to-typescript@^3

# yarn
yarn add yapi-to-typescript@^3

# pnpm
pnpm add yapi-to-typescript@^3
`,paraId:7,tocIndex:3},{value:"\u5982\u679C\u4F60\u5728\u56FD\u5185\u4E14\u6CA1\u6709\u4EFB\u4F55\u79D1\u5B66",paraId:8,tocIndex:3},{value:"\u4E60",paraId:8,tocIndex:3},{value:"\u4E0A\u7F51\u63AA\u65BD\uFF0C\u4E0A\u8FF0\u5B89\u88C5\u8FC7\u7A0B\u53EF\u80FD\u4F1A\u975E\u5E38\u6162\uFF0C\u63A8\u8350\u4F60\u4F7F\u7528 ",paraId:8,tocIndex:3},{value:"tbify",paraId:8,tocIndex:3},{value:"\uFF0C\u8FD9\u4E2A\u5DE5\u5177\u53EF\u4EE5\u81EA\u52A8\u5C06 npm\u3001yarn \u7B49\u5305\u7BA1\u7406\u5DE5\u5177\u8FDE\u4E0A\u56FD\u5185\u7684\u6DD8\u5B9D\u955C\u50CF\uFF0C\u52A0\u901F\u5B89\u88C5\u3002",paraId:8,tocIndex:3},{value:"\u9489\u9489\u626B\u7801\u52A0\u5165\u4EA4\u6D41\u7FA4\uFF1A",paraId:9,tocIndex:4},{value:"MIT",paraId:10,tocIndex:5},{value:" \xA9 ",paraId:10,tocIndex:5},{value:"Jay Fong",paraId:10,tocIndex:5}];a.d(e,["texts",0,n])}),78015:(function(d,e,a){a.r(e);const n=[{value:"\u7EDF\u4E00\u8BF7\u6C42\u51FD\u6570\u7EDF\u4E00\u63A5\u6536\u5404\u4E2A\u63A5\u53E3\u7684\u914D\u7F6E\uFF0C\u5E76\u8FD4\u56DE\u5177\u4F53\u63A5\u53E3\u7684\u54CD\u5E94\u7ED3\u679C\u3002",paraId:0,tocIndex:0},{value:"\u7EDF\u4E00\u8BF7\u6C42\u51FD\u6570\u6587\u4EF6\u8DEF\u5F84\u53EF\u901A\u8FC7 ",paraId:1,tocIndex:0},{value:"requestFunctionFilePath",paraId:2,tocIndex:0},{value:" \u914D\u7F6E\uFF0C\u8BE5\u6587\u4EF6\u5FC5\u987B\u5BFC\u51FA\u4E00\u4E2A\u7EDF\u4E00\u8BF7\u6C42\u51FD\u6570\u3002",paraId:1,tocIndex:0},{value:"\u9ED8\u8BA4\u5BFC\u51FA\u4E00\u4E2A\u5F02\u6B65\u7684\u8BF7\u6C42\u51FD\u6570\u5373\u53EF\uFF1A",paraId:3,tocIndex:1},{value:`import { RequestFunctionParams } from 'yapi-to-typescript'

export default async function request<TResponseData>(
  payload: RequestFunctionParams,
): Promise<TResponseData> {
  // ...
  // \u57FA\u4E8E payload \u83B7\u53D6\u63A5\u53E3\u4FE1\u606F\uFF0C
  // \u7136\u540E\u5BF9\u63A5\u53E3\u53D1\u8D77\u8BF7\u6C42\uFF0C
  // \u63A5\u7740\u83B7\u53D6\u63A5\u53E3\u54CD\u5E94\u6570\u636E\uFF0C
  // \u5E76\u4E14\u6839\u636E payload \u7684\u76F8\u5173\u4FE1\u606F\u89E3\u6790\u54CD\u5E94\u6570\u636E\u4F5C\u4E3A\u8BF7\u6C42\u7ED3\u679C\uFF0C
  // \u6700\u540E\u8FD4\u56DE\u8BF7\u6C42\u7ED3\u679C\u3002
  // ...
}
`,paraId:4,tocIndex:1},{value:"\u7EDF\u4E00\u8BF7\u6C42\u51FD\u6570\u5185\u53EF\u901A\u8FC7\u7B2C\u4E00\u4E2A\u53C2\u6570 ",paraId:5,tocIndex:2},{value:"payload",paraId:5,tocIndex:2},{value:" \u83B7\u53D6\u63A5\u53E3\u4FE1\u606F\u3002",paraId:5,tocIndex:2},{value:"\u7C7B\u578B\uFF1A",paraId:6,tocIndex:3},{value:"string",paraId:6,tocIndex:3},{value:"\u8BF4\u660E\uFF1A",paraId:6,tocIndex:3},{value:"\u63A5\u53E3 Mock \u5730\u5740\uFF0C\u8BE5\u5730\u5740\u6839\u636E\u63A5\u53E3 ID \u81EA\u52A8\u751F\u6210\uFF0C\u5982\uFF1A",paraId:7,tocIndex:3},{value:"https://my.yapi.server/mock/993",paraId:7,tocIndex:3},{value:"\u3002",paraId:7,tocIndex:3},{value:"\u7C7B\u578B\uFF1A",paraId:8,tocIndex:4},{value:"string",paraId:8,tocIndex:4},{value:"\u8BF4\u660E\uFF1A",paraId:8,tocIndex:4},{value:"\u63A5\u53E3\u6D4B\u8BD5\u73AF\u5883\u5730\u5740\uFF0C\u8BE5\u5730\u5740\u6839\u636E\u914D\u7F6E ",paraId:9,tocIndex:4},{value:"devEnvName",paraId:10,tocIndex:4},{value:" \u62C9\u53D6\uFF0C\u5982\uFF1A",paraId:9,tocIndex:4},{value:"https://my.dev.server/api/v2",paraId:9,tocIndex:4},{value:"\u3002",paraId:9,tocIndex:4},{value:"\u7C7B\u578B\uFF1A",paraId:11,tocIndex:5},{value:"string",paraId:11,tocIndex:5},{value:"\u8BF4\u660E\uFF1A",paraId:11,tocIndex:5},{value:"\u63A5\u53E3\u751F\u4EA7\u73AF\u5883\u5730\u5740\uFF0C\u8BE5\u5730\u5740\u6839\u636E\u914D\u7F6E ",paraId:12,tocIndex:5},{value:"prodEnvName",paraId:13,tocIndex:5},{value:" \u62C9\u53D6\uFF0C\u5982\uFF1A",paraId:12,tocIndex:5},{value:"https://my.prod.server/api/v2",paraId:12,tocIndex:5},{value:"\u3002",paraId:12,tocIndex:5},{value:"\u7C7B\u578B\uFF1A",paraId:14,tocIndex:6},{value:"string",paraId:14,tocIndex:6},{value:"\u8BF4\u660E\uFF1A",paraId:14,tocIndex:6},{value:"\u63A5\u53E3\u8DEF\u5F84\uFF0C\u8BE5\u8DEF\u5F84\u4EE5 YApi \u4E0A\u914D\u7F6E\u7684\u63A5\u53E3\u8DEF\u5F84\u4E3A\u57FA\u51C6\uFF0C\u9996\u5148\u5C06\u5176\u4E2D\u7684\u8DEF\u5F84\u53C2\u6570\u66FF\u6362\u4E3A\u8DEF\u5F84\u53C2\u6570\u503C\uFF0C\u7136\u540E\u5C06\u63A5\u53E3\u7684\u67E5\u8BE2\u53C2\u6570\u5E8F\u5217\u5316\u4E3A\u67E5\u8BE2\u5B57\u7B26\u4E32\u9644\u7740\u5728\u540E\u9762\u3002\u4E3E\u4E2A\u4F8B\u5B50\uFF1A",paraId:15,tocIndex:6},{value:"\u5BF9\u4E8E\u4E0A\u56FE\u6240\u793A\u7684\u63A5\u53E3\uFF0C\u5982\u679C\u4F60\u8C03\u7528\u8BE5\u63A5\u53E3\u8BF7\u6C42\u51FD\u6570\u65F6\u4F20\u53C2 ",paraId:16,tocIndex:6},{value:"{ id: '120', site: 'weixin' }",paraId:16,tocIndex:6},{value:"\uFF0C\u5219 ",paraId:16,tocIndex:6},{value:"path",paraId:16,tocIndex:6},{value:" \u4E3A\uFF1A",paraId:16,tocIndex:6},{value:"/getUserInfo/120?site=weixin",paraId:16,tocIndex:6},{value:"\u3002",paraId:16,tocIndex:6},{value:"\u7C7B\u578B\uFF1A",paraId:17,tocIndex:7},{value:"'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH'",paraId:17,tocIndex:7},{value:"\u5B9E\u9645\u8BF7\u8FD9\u6837\u4F7F\u7528\uFF1A",paraId:18,tocIndex:7},{value:`import { Method } from 'yapi-to-typescript'

console.log(Method.GET, Method.POST)
`,paraId:19,tocIndex:7},{value:"\u8BF4\u660E\uFF1A",paraId:20,tocIndex:7},{value:"\u8BF7\u6C42\u65B9\u6CD5\u3002",paraId:21,tocIndex:7},{value:"3.19.0+",paraId:22,tocIndex:7},{value:"\u7C7B\u578B\uFF1A",paraId:23,tocIndex:8},{value:"Record<string, string>",paraId:23,tocIndex:8},{value:"\u8BF4\u660E\uFF1A",paraId:24,tocIndex:8},{value:"\u63A5\u53E3\u8BF7\u6C42\u5934\uFF0C\u6765\u81EA\u8FD9\u91CC\uFF1A",paraId:25,tocIndex:8},{value:"\u5176\u4E2D ",paraId:26,tocIndex:8},{value:"Content-Type",paraId:26,tocIndex:8},{value:" \u4F1A\u88AB\u53BB\u9664\u3002",paraId:26,tocIndex:8},{value:"\u7C7B\u578B\uFF1A",paraId:27,tocIndex:9},{value:"'query' | 'form' | 'json' | 'text' | 'file' | 'raw' | 'none'",paraId:27,tocIndex:9},{value:"\u5B9E\u9645\u8BF7\u8FD9\u6837\u4F7F\u7528\uFF1A",paraId:28,tocIndex:9},{value:`import { RequestBodyType } from 'yapi-to-typescript'

console.log(RequestBodyType.form, RequestBodyType.json)
`,paraId:29,tocIndex:9},{value:"\u8BF4\u660E\uFF1A",paraId:30,tocIndex:9},{value:"\u8BF7\u6C42\u6570\u636E\u7C7B\u578B\u3002",paraId:31,tocIndex:9},{value:"\u7C7B\u578B\uFF1A",paraId:32,tocIndex:10},{value:"'json' | 'text' | 'xml' | 'raw'",paraId:32,tocIndex:10},{value:"\u5B9E\u9645\u8BF7\u8FD9\u6837\u4F7F\u7528\uFF1A",paraId:33,tocIndex:10},{value:`import { ResponseBodyType } from 'yapi-to-typescript'

console.log(ResponseBodyType.text, ResponseBodyType.json)
`,paraId:34,tocIndex:10},{value:"\u8BF4\u660E\uFF1A",paraId:35,tocIndex:10},{value:"\u8FD4\u56DE\u6570\u636E\u7C7B\u578B\u3002",paraId:36,tocIndex:10},{value:"\u7C7B\u578B\uFF1A",paraId:37,tocIndex:11},{value:"string",paraId:37,tocIndex:11},{value:"\u8BF4\u660E\uFF1A",paraId:37,tocIndex:11},{value:"\u6570\u636E\u6240\u5728\u952E\uFF0C\u6765\u81EA\u914D\u7F6E ",paraId:38,tocIndex:11},{value:"dataKey",paraId:39,tocIndex:11},{value:"\u3002",paraId:38,tocIndex:11},{value:"\u7C7B\u578B\uFF1A",paraId:40,tocIndex:12},{value:"string[]",paraId:40,tocIndex:12},{value:"\u8BF4\u660E\uFF1A",paraId:40,tocIndex:12},{value:"\u8DEF\u5F84\u53C2\u6570\u7684\u540D\u79F0\u5217\u8868\u3002\u4E00\u822C\u4E0D\u7528\u5173\u5FC3\uFF0C\u8DEF\u5F84\u53C2\u6570\u503C\u5DF2\u7ECF\u88AB\u9884\u5904\u7406\u8FDB\u4E86 ",paraId:41,tocIndex:12},{value:"path",paraId:42,tocIndex:12},{value:"\u3002",paraId:41,tocIndex:12},{value:"\u7C7B\u578B\uFF1A",paraId:43,tocIndex:13},{value:"string[]",paraId:43,tocIndex:13},{value:"\u8BF4\u660E\uFF1A",paraId:43,tocIndex:13},{value:"\u67E5\u8BE2\u53C2\u6570\u7684\u540D\u79F0\u5217\u8868\u3002\u4E00\u822C\u4E0D\u7528\u5173\u5FC3\uFF0C\u67E5\u8BE2\u53C2\u6570\u952E\u503C\u5DF2\u7ECF\u88AB\u9884\u5904\u7406\u8FDB\u4E86 ",paraId:44,tocIndex:13},{value:"path",paraId:45,tocIndex:13},{value:"\u3002",paraId:44,tocIndex:13},{value:"\u7C7B\u578B\uFF1A",paraId:46,tocIndex:14},{value:"JSONSchema4",paraId:46,tocIndex:14},{value:"\u8BF4\u660E\uFF1A",paraId:46,tocIndex:14},{value:"\u8BF7\u6C42\u6570\u636E\u7684 JSON Schema\uFF0C\u7531\u914D\u7F6E ",paraId:47,tocIndex:14},{value:"jsonSchema",paraId:48,tocIndex:14},{value:" \u5F00\u542F\u3002",paraId:47,tocIndex:14},{value:"\u7C7B\u578B\uFF1A",paraId:49,tocIndex:15},{value:"JSONSchema4",paraId:49,tocIndex:15},{value:"\u8BF4\u660E\uFF1A",paraId:49,tocIndex:15},{value:"\u8FD4\u56DE\u6570\u636E\u7684 JSON Schema\uFF0C\u7531\u914D\u7F6E ",paraId:50,tocIndex:15},{value:"jsonSchema",paraId:51,tocIndex:15},{value:" \u5F00\u542F\u3002",paraId:50,tocIndex:15},{value:"3.20.0+",paraId:52,tocIndex:15},{value:"\u7C7B\u578B\uFF1A",paraId:53,tocIndex:16},{value:"string",paraId:53,tocIndex:16},{value:"\u8BF4\u660E\uFF1A",paraId:53,tocIndex:16},{value:"\u8BF7\u6C42\u51FD\u6570\u7684\u540D\u79F0\u3002",paraId:54,tocIndex:16},{value:"\u7C7B\u578B\uFF1A",paraId:55,tocIndex:17},{value:"object",paraId:55,tocIndex:17},{value:"\u8BF4\u660E\uFF1A",paraId:55,tocIndex:17},{value:"\u8BF7\u6C42\u6570\u636E\u4E2D\u7684\u975E\u6587\u4EF6\u6570\u636E\u3002",paraId:56,tocIndex:17},{value:"\u7C7B\u578B\uFF1A",paraId:57,tocIndex:18},{value:"boolean",paraId:57,tocIndex:18},{value:"\u8BF4\u660E\uFF1A",paraId:57,tocIndex:18},{value:"\u8BF7\u6C42\u6570\u636E\u4E2D\u662F\u5426\u5305\u542B\u6587\u4EF6\u6570\u636E\u3002",paraId:58,tocIndex:18},{value:"\u7C7B\u578B\uFF1A",paraId:59,tocIndex:19},{value:"object",paraId:59,tocIndex:19},{value:"\u8BF4\u660E\uFF1A",paraId:59,tocIndex:19},{value:"\u8BF7\u6C42\u6570\u636E\u4E2D\u7684\u6587\u4EF6\u6570\u636E\u3002",paraId:60,tocIndex:19},{value:"\u7C7B\u578B\uFF1A",paraId:61,tocIndex:20},{value:"() => FormData",paraId:61,tocIndex:20},{value:"\u8BF4\u660E\uFF1A",paraId:61,tocIndex:20},{value:"\u5982\u679C\u8FD9\u662F\u4E00\u4E2A\u6D89\u53CA\u6587\u4EF6\u4E0A\u4F20\u7684\u63A5\u53E3\uFF0C\u53EF\u901A\u8FC7 ",paraId:62,tocIndex:20},{value:"getFormData()",paraId:62,tocIndex:20},{value:" \u83B7\u53D6\u5230 ",paraId:62,tocIndex:20},{value:"FormData",paraId:62,tocIndex:20},{value:" \u76F4\u63A5\u4E0A\u4F20\uFF0C\u8BE5 ",paraId:62,tocIndex:20},{value:"FormData",paraId:62,tocIndex:20},{value:" \u5185\u5DF2\u7ECF\u6DFB\u52A0\u4E86 ",paraId:62,tocIndex:20},{value:"data",paraId:62,tocIndex:20},{value:"\u3001",paraId:62,tocIndex:20},{value:"fileData",paraId:62,tocIndex:20},{value:"\u3002",paraId:62,tocIndex:20},{value:"3.27.0+",paraId:63,tocIndex:20},{value:"\u7C7B\u578B\uFF1A",paraId:64,tocIndex:21},{value:"Record<string, any>",paraId:64,tocIndex:21},{value:"\u8BF4\u660E\uFF1A",paraId:64,tocIndex:21},{value:"\u989D\u5916\u4FE1\u606F\uFF0C\u7531\u914D\u7F6E ",paraId:65,tocIndex:21},{value:"setRequestFunctionExtraInfo",paraId:66,tocIndex:21},{value:" \u5B9A\u4E49\u3002",paraId:65,tocIndex:21},{value:"\u4E0B\u9762\u662F\u4E00\u4E2A\u57FA\u4E8E\u6D4F\u89C8\u5668\u539F\u751F ",paraId:67,tocIndex:22},{value:"fetch",paraId:67,tocIndex:22},{value:" \u7684\u793A\u4F8B\uFF0C\u901A\u8FC7 ",paraId:67,tocIndex:22},{value:"cross-fetch",paraId:67,tocIndex:22},{value:"\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u8BA9\u5B83\u8FD0\u884C\u5728\u4E00\u4E9B\u672A\u5B9E\u73B0 fetch \u63A5\u53E3\u7684\u8001\u65E7\u6D4F\u89C8\u5668\u3001Node.js\u3001React Native \u4E0A\u3002",paraId:67,tocIndex:22},{value:`import fetch from 'cross-fetch'
import { RequestBodyType, RequestFunctionParams } from 'yapi-to-typescript'

export interface RequestOptions {
  /**
   * \u662F\u5426\u8FD4\u56DE Blob \u7ED3\u679C\uFF0C\u9002\u7528\u67D0\u4E9B\u8FD4\u56DE\u6587\u4EF6\u6D41\u7684\u63A5\u53E3\u3002
   */
  returnBlob?: boolean
}

export enum RequestErrorType {
  NetworkError = 'NetworkError',
  StatusError = 'StatusError',
  BusinessError = 'BusinessError',
}

export class RequestError extends Error {
  constructor(
    public type: RequestErrorType,
    public message: any,
    public httpStatusOrBusinessCode: number = 0,
  ) {
    super(message instanceof Error ? message.message : String(message))
  }
}

export default async function request<TResponseData>(
  payload: RequestFunctionParams,
  options?: RequestOptions,
): Promise<TResponseData> {
  try {
    // \u57FA\u7840 URL\uFF0C\u53EF\u4EE5\u4ECE\u8F7D\u8377\u4E2D\u62C9\u53D6\u6216\u8005\u5199\u6B7B
    const baseUrl = payload.prodUrl

    // \u5B8C\u6574 URL
    const url = \`\${baseUrl}\${payload.path}\`

    // fetch \u9009\u9879
    const fetchOptions: RequestInit = {
      method: payload.method,
      headers: {
        ...(payload.hasFileData
          ? {}
          : payload.requestBodyType === RequestBodyType.json
          ? { 'Content-Type': 'application/json; charset=UTF-8' }
          : payload.requestBodyType === RequestBodyType.form
          ? {
              'Content-Type':
                'application/x-www-form-urlencoded; charset=UTF-8',
            }
          : {}),
      },
      body: payload.hasFileData
        ? payload.getFormData()
        : payload.requestBodyType === RequestBodyType.json
        ? JSON.stringify(payload.data)
        : payload.requestBodyType === RequestBodyType.form
        ? Object.keys(payload.data)
            .filter(key => payload.data[key] != null)
            .map(
              key =>
                \`\${encodeURIComponent(key)}=\${encodeURIComponent(
                  payload.data[key],
                )}\`,
            )
            .join('&')
        : undefined,
    }

    // \u53D1\u8D77\u8BF7\u6C42
    const [fetchErr, fetchRes] = await fetch(url, fetchOptions).then<
      [
        // \u5982\u679C\u9047\u5230\u7F51\u7EDC\u6545\u969C\uFF0Cfetch \u5C06\u4F1A reject \u4E00\u4E2A TypeError \u5BF9\u8C61
        TypeError,
        Response,
      ]
    >(
      res => [null, res] as any,
      err => [err, null] as any,
    )

    // \u7F51\u7EDC\u9519\u8BEF
    if (fetchErr) {
      throw new RequestError(RequestErrorType.NetworkError, fetchErr)
    }

    // \u72B6\u6001\u9519\u8BEF
    if (fetchRes.status < 200 || fetchRes.status >= 300) {
      throw new RequestError(
        RequestErrorType.StatusError,
        \`\${fetchRes.status}: \${fetchRes.statusText}\`,
        fetchRes.status,
      )
    }

    // \u8BF7\u6C42\u7ED3\u679C\u5904\u7406
    const res = options?.returnBlob
      ? await fetchRes.blob()
      : (fetchRes.headers.get('Content-Type') || '').indexOf(
          'application/json',
        ) >= 0
      ? await fetchRes
          .json()
          // \u89E3\u6790 JSON \u62A5\u9519\u65F6\u7ED9\u4E2A\u7A7A\u5BF9\u8C61\u4F5C\u4E3A\u9ED8\u8BA4\u503C
          .catch(() => ({}))
      : await fetchRes.text()

    // \u4E1A\u52A1\u9519\u8BEF
    // \u5047\u8BBE code \u4E3A 0 \u65F6\u8868\u793A\u8BF7\u6C42\u6210\u529F\uFF0C\u5176\u4ED6\u8868\u793A\u8BF7\u6C42\u5931\u8D25\uFF0C\u540C\u65F6 msg \u8868\u793A\u9519\u8BEF\u4FE1\u606F
    if (
      res != null &&
      typeof res === 'object' &&
      res.code != null &&
      res.code !== 0
    ) {
      throw new RequestError(RequestErrorType.BusinessError, res.msg, res.code)
    }

    // \u9002\u914D dataKey\uFF0C\u53D6\u51FA data
    const data: TResponseData =
      res != null &&
      typeof res === 'object' &&
      payload.dataKey != null &&
      res[payload.dataKey] != null
        ? res[payload.dataKey]
        : res

    return data
  } catch (err: unknown) {
    // \u91CD\u8BD5\u51FD\u6570
    const retry = () => request<TResponseData>(payload, options)
    if (err instanceof RequestError) {
      // \u7F51\u7EDC\u9519\u8BEF\u5904\u7406
      if (err.type === RequestErrorType.NetworkError) {
        // \u6B64\u5904\u53EF\u5F39\u7A97\u8BF4\u660E\u539F\u56E0\uFF1Aerr.message\uFF0C\u6700\u597D\u4E5F\u63D0\u4F9B\u91CD\u8BD5\u64CD\u4F5C\uFF0C\u4E0B\u9762\u4EE5\u539F\u751F confirm \u4E3A\u4F8B\uFF0C\u5EFA\u8BAE\u66FF\u6362\u4E3A\u9879\u76EE\u4E2D\u4F7F\u7528\u5230\u7684\u5F39\u7A97\u7EC4\u4EF6
        const isRetry = confirm(\`\u7F51\u7EDC\u9519\u8BEF\uFF1A\${err.message}\uFF0C\u662F\u5426\u91CD\u8BD5\uFF1F\`)
        if (isRetry) {
          return retry()
        }
        throw err
      }

      // \u72B6\u6001\u9519\u8BEF\u5904\u7406
      else if (err.type === RequestErrorType.StatusError) {
        // \u7528\u6237\u672A\u767B\u5F55\u5904\u7406
        if (err.httpStatusOrBusinessCode === 401) {
          // \u63A8\u8350\u5728\u6B64\u5904\u53D1\u8D77\u767B\u5F55\u903B\u8F91
        }
      }

      // \u4E1A\u52A1\u9519\u8BEF\u5904\u7406
      else if (err.type === RequestErrorType.BusinessError) {
        // \u63A8\u8350\u5F39\u4E2A\u8F7B\u63D0\u793A\u8BF4\u660E\u9519\u8BEF\u539F\u56E0\uFF1Aerr.message
        throw err
      }
    } else {
      throw err
    }
  }
}
`,paraId:68,tocIndex:22},{value:"\u4E0B\u9762\u662F\u4E00\u4E2A\u57FA\u4E8E\u5C0F\u7A0B\u5E8F\u539F\u751F ",paraId:69,tocIndex:23},{value:"request",paraId:69,tocIndex:23},{value:" \u65B9\u6CD5\u7684\u793A\u4F8B\uFF0C\u652F\u6301\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u3001QQ \u5C0F\u7A0B\u5E8F\u3001\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u3001\u767E\u5EA6\u5C0F\u7A0B\u5E8F\u3001\u5B57\u8282\u8DF3\u52A8\u5C0F\u7A0B\u5E8F\u3001\u9489\u9489\u5C0F\u7A0B\u5E8F\u3001\u4EAC\u4E1C\u5C0F\u7A0B\u5E8F\u3002",paraId:69,tocIndex:23},{value:`// TODO
`,paraId:70,tocIndex:23}];a.d(e,["texts",0,n])}),48749:(function(d,e,a){a.r(e);const n=[{value:"\u4F7F\u7528\u4EE5\u4E0B\u547D\u4EE4\u751F\u6210\u4EE3\u7801\uFF1A",paraId:0,tocIndex:1},{value:`npx ytt
`,paraId:1,tocIndex:1},{value:"\u5982\u679C\u8981\u4F7F\u7528\u81EA\u5B9A\u4E49\u7684\u914D\u7F6E\u6587\u4EF6\uFF1A",paraId:2,tocIndex:1},{value:`npx ytt -c config/ytt.ts
`,paraId:3,tocIndex:1},{value:"\u89C1",paraId:4,tocIndex:2},{value:"\u7EDF\u4E00\u8BF7\u6C42\u51FD\u6570",paraId:5,tocIndex:2},{value:"\u3002",paraId:4,tocIndex:2},{value:"\u4ECE ",paraId:6,tocIndex:3},{value:"outputFilePath",paraId:7,tocIndex:3},{value:" \u5BFC\u5165\u4F60\u8981\u8C03\u7528\u7684\u63A5\u53E3\u8BF7\u6C42\u51FD\u6570\u5373\u53EF\uFF0C\u63A5\u53E3\u8BF7\u6C42\u51FD\u6570\u7684\u540D\u79F0\u7531\u914D\u7F6E ",paraId:6,tocIndex:3},{value:"getRequestFunctionName",paraId:8,tocIndex:3},{value:" \u51B3\u5B9A\uFF0C\u5982\uFF1A",paraId:6,tocIndex:3},{value:`import { getUserInfo } from '../api'

const updateUserInfo = async () => {
  const userInfo = await getUserInfo({
    id: 1,
  })
  console.log(userInfo)
}
`,paraId:9,tocIndex:3},{value:"\u5BF9\u4E8E\u4E0A\u4F20\u6587\u4EF6\u7C7B\u63A5\u53E3\uFF0C\u4F60\u9700\u8981\u5C06\u6587\u4EF6\u5305\u88C5\u4E3A\u4E00\u4E2A FileData \u5B9E\u4F8B\uFF0C\u5982\uFF1A",paraId:10,tocIndex:4},{value:`import { FileData } from 'yapi-to-typescript'
import { uploadFile } from '../api'

const changeAvatar = async (file: File) => {
  const res = await uploadFile({
    type: 'avatar',
    file: new FileData(file),
  })
  console.log(res)
}
`,paraId:11,tocIndex:4},{value:"\u5982\u679C\u4F60\u6CA1\u52A8\u8FC7 ",paraId:12,tocIndex:5},{value:"getRequestDataTypeName",paraId:13,tocIndex:5},{value:"\u3001",paraId:12,tocIndex:5},{value:"getResponseDataTypeName",paraId:14,tocIndex:5},{value:" \u8FD9\u4E24\u4E2A\u914D\u7F6E\uFF0C\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u4F60\u53EF\u4EE5\u8FD9\u6837\u83B7\u53D6\u63A5\u53E3\u7684\u8BF7\u6C42\u6570\u636E\u3001\u8FD4\u56DE\u6570\u636E\u7C7B\u578B\uFF1A",paraId:12,tocIndex:5},{value:`import { getUserInfo, GetUserInfoRequest, GetUserInfoResponse } from '../api'

interface CustomUserInfo extends GetUserInfoResponse {
  gender: 'male' | 'female' | 'unknown'
}

const customGetUserInfo = async (
  payload: GetUserInfoRequest,
): Promise<CustomUserInfo> => {
  const userInfo = await getUserInfo(payload)
  return {
    ...userInfo,
    gender:
      userInfo.sexy === 1 ? 'male' : userInfo.sexy === 2 ? 'female' : 'unknown',
  }
}
`,paraId:15,tocIndex:5},{value:"\u5982\u679C\u4F60\u53EA\u60F3\u83B7\u5F97\u8BF7\u6C42\u6570\u636E\u3001\u8FD4\u56DE\u6570\u636E\u4E0B\u67D0\u4E2A\u5B57\u6BB5\u7684\u7C7B\u578B\uFF0C\u53EF\u4EE5\u8FD9\u6837\u505A\uFF1A",paraId:16,tocIndex:5},{value:`import { GetUserInfoResponse } from '../api'

type UserRole = GetUserInfoResponse['role']
`,paraId:17,tocIndex:5},{value:"3.31.0+",paraId:18,tocIndex:5},{value:"\u53EF\u4F7F\u7528\u94A9\u5B50\u5728\u751F\u6210\u6210\u529F\u3001\u5931\u8D25\u3001\u5B8C\u6BD5\u65F6\u8FDB\u884C\u76F8\u5173\u64CD\u4F5C\u3002",paraId:19,tocIndex:6},{value:`import { defineConfig } from 'yapi-to-typescript'

export default defineConfig(
  {
    // \u751F\u6210\u914D\u7F6E
  },

  // \u94A9\u5B50
  {
    success() {
      // \u751F\u6210\u6210\u529F\u65F6\u89E6\u53D1
    },
    fail() {
      // \u751F\u6210\u5931\u8D25\u65F6\u89E6\u53D1
    },
    complete() {
      // \u751F\u6210\u5B8C\u6BD5\u65F6\u89E6\u53D1\uFF08\u65E0\u8BBA\u6210\u529F\u3001\u5931\u8D25\uFF09
    },
  },
)
`,paraId:20,tocIndex:6},{value:"3.32.0+",paraId:21,tocIndex:6},{value:"\u8BE5\u529F\u80FD\u9002\u7528\u4E8E\u5B9A\u4E49\u6811\u7B49\u9700\u8981\u590D\u7528\u7C7B\u578B\u7684\u573A\u666F\u3002",paraId:22,tocIndex:7},{value:"YApi \u672C\u8EAB\u662F\u4E0D\u652F\u6301\u5B9A\u4E49\u5F15\u7528\u7C7B\u578B\u7684\uFF0C\u672C\u529F\u80FD\u4EC5\u662F\u5728 YApi \u81EA\u6709\u529F\u80FD\u4E0A\u505A\u4E86\u4EE5\u4E0B\u7EA6\u5B9A\u652F\u6301\u5B9A\u4E49\u5F15\u7528\u7C7B\u578B\uFF1A",paraId:23,tocIndex:7},{value:"\u5FC5\u987B\u5728 ",paraId:24,tocIndex:7},{value:"\u6807\u9898",paraId:24,tocIndex:7},{value:" \u680F\u5B9A\u4E49\uFF08YApi \u4F4E\u7248\u672C\u6CA1\u6709 ",paraId:24,tocIndex:7},{value:"\u6807\u9898",paraId:24,tocIndex:7},{value:" \u680F\uFF0C\u4E5F\u53EF\u4EE5\u5728 ",paraId:24,tocIndex:7},{value:"\u5907\u6CE8",paraId:24,tocIndex:7},{value:" \u680F\u5B9A\u4E49",paraId:24,tocIndex:7},{value:"3.33.0+",paraId:25,tocIndex:7},{value:"\uFF09\uFF1B",paraId:24,tocIndex:7},{value:"\u5FC5\u987B\u4EE5 ",paraId:24,tocIndex:7},{value:"&",paraId:24,tocIndex:7},{value:" \u5F00\u5934\uFF1B",paraId:24,tocIndex:7},{value:"\u5F15\u7528\u8DEF\u5F84\u89C4\u8303\u548C\u6587\u4EF6\u8DEF\u5F84\u89C4\u8303\u4E00\u81F4\uFF1A",paraId:24,tocIndex:7},{value:".",paraId:24,tocIndex:7},{value:" \u8868\u793A\u5F53\u524D\u7EA7\uFF0C",paraId:24,tocIndex:7},{value:"..",paraId:24,tocIndex:7},{value:" \u8868\u793A\u4E0A\u4E00\u7EA7\uFF0C",paraId:24,tocIndex:7},{value:"/",paraId:24,tocIndex:7},{value:" \u5728\u9996\u4F4D\u65F6\u8868\u793A\u6839\u7EA7\uFF0C\u5728\u4E2D\u95F4\u65F6\u8868\u793A\u5206\u5272\uFF1B",paraId:24,tocIndex:7},{value:"\u5F15\u7528\u6570\u7EC4\u7684\u6761\u76EE\u65F6\u5FC5\u987B\u52A0\u4E0A ",paraId:24,tocIndex:7},{value:"/0",paraId:24,tocIndex:7},{value:"\uFF1B",paraId:24,tocIndex:7},{value:"\u5B9A\u4E49\u5F15\u7528\u7C7B\u578B\u540E\u539F\u672C\u7684\u7C7B\u578B\u5B9A\u4E49\u5C06\u5931\u6548\u3002",paraId:24,tocIndex:7},{value:"\u4E3E\u4F8B\uFF1A",paraId:26,tocIndex:7},{value:"\u5B9A\u4E49\u6811",paraId:27,tocIndex:7},{value:"\u4F7F\u7528\u7EDD\u5BF9\u8DEF\u5F84\u5F15\u7528",paraId:28,tocIndex:7},{value:"\u4F7F\u7528\u76F8\u5BF9\u8DEF\u5F84\u5F15\u7528",paraId:29,tocIndex:7},{value:"\u5F15\u7528\u6570\u7EC4\u6761\u76EE",paraId:30,tocIndex:7}];a.d(e,["texts",0,n])})}]);
