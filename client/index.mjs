// 参考：https://github.com/YMFE/yapi/blob/master/server/models/interface.js#L9

/** 请求方式 */
var Method;

(function (Method) {
  Method["GET"] = "GET";
  Method["POST"] = "POST";
  Method["PUT"] = "PUT";
  Method["DELETE"] = "DELETE";
  Method["HEAD"] = "HEAD";
  Method["OPTIONS"] = "OPTIONS";
  Method["PATCH"] = "PATCH";
})(Method || (Method = {}));
/** 是否必需 */


var Required;

(function (Required) {
  /** 不必需 */
  Required["false"] = "0";
  /** 必需 */

  Required["true"] = "1";
})(Required || (Required = {}));
/** 请求数据类型 */


var RequestBodyType;

(function (RequestBodyType) {
  /** 查询字符串 */
  RequestBodyType["query"] = "query";
  /** 表单 */

  RequestBodyType["form"] = "form";
  /** JSON */

  RequestBodyType["json"] = "json";
  /** 纯文本 */

  RequestBodyType["text"] = "text";
  /** 文件 */

  RequestBodyType["file"] = "file";
  /** 原始数据 */

  RequestBodyType["raw"] = "raw";
})(RequestBodyType || (RequestBodyType = {}));
/** 请求表单条目类型 */


var RequestFormItemType;

(function (RequestFormItemType) {
  /** 纯文本 */
  RequestFormItemType["text"] = "text";
  /** 文件 */

  RequestFormItemType["file"] = "file";
})(RequestFormItemType || (RequestFormItemType = {}));
/** 返回数据类型 */


var ResponseBodyType;

(function (ResponseBodyType) {
  /** JSON */
  ResponseBodyType["json"] = "json";
  /** 纯文本 */

  ResponseBodyType["text"] = "text";
  /** XML */

  ResponseBodyType["xml"] = "xml";
  /** 原始数据 */

  ResponseBodyType["raw"] = "raw";
  /** JSON Schema */

  ResponseBodyType["jsonSchema"] = "json-schema";
})(ResponseBodyType || (ResponseBodyType = {}));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var FileData =
/** @class */
function () {
  /**
   * 文件数据辅助类，统一网页、小程序等平台的文件上传。
   *
   * @param originalFileData 原始文件数据
   */
  function FileData(originalFileData) {
    this.originalFileData = originalFileData;
  }
  /**
   * 获取原始文件数据。
   *
   * @returns 原始文件数据
   */


  FileData.prototype.getOriginalFileData = function () {
    return this.originalFileData;
  };

  return FileData;
}();
/**
 * 解析请求数据，从请求数据中分离出普通数据和文件数据。
 *
 * @param requestData 要解析的请求数据
 * @returns 包含普通数据(data)和文件数据(fileData)的对象，data、fileData 为空对象时，表示没有此类数据
 */

function parseRequestData(requestData) {
  var result = {
    data: {},
    fileData: {}
  };

  if (requestData != null && _typeof(requestData) === 'object') {
    Object.keys(requestData).forEach(function (key) {
      if (requestData[key] && requestData[key] instanceof FileData) {
        result.fileData[key] = requestData[key].getOriginalFileData();
      } else {
        result.data[key] = requestData[key];
      }
    });
  }

  return result;
}

export { FileData, Method, RequestBodyType, RequestFormItemType, Required, ResponseBodyType, parseRequestData };
