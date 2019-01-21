const request = {
  jar() {
    return {
      setCookie() {},
    }
  },
  defaults() {
    return request
  },
  post: (_, { form: data }) => ({
    errcode: data.password === 'errorPassword' ? 1 : 0,
  }),
  get: () => [
    {
      name: 'test',
      desc: null,
      add_time: 1547006221,
      up_time: 1547006221,
      index: 0,
      list: [
        {
          _id: 45,
          method: 'GET',
          catid: 58,
          title: 'get',
          path: '/get',
          project_id: 23,
          res_body_type: 'json',
          uid: 11,
          add_time: 1547006228,
          up_time: 1547006250,
          __v: 0,
          markdown: '',
          desc: '',
          res_body: '{"type":"object","title":"empty object","properties":{"data":{"type":"string"}},"required":["data"]}',
          tag: [],
          index: 0,
          api_opened: false,
          res_body_is_json_schema: true,
          req_body_form: [],
          req_body_is_json_schema: true,
          req_params: [],
          req_headers: [],
          req_query: [],
          query_path: {
            path: '/get',
            params: [],
          },
          type: 'static',
          status: 'undone',
          edit_uid: 0,
        },
        {
          _id: 48,
          method: 'POST',
          catid: 58,
          title: 'post',
          path: '/post',
          project_id: 23,
          res_body_type: 'json',
          uid: 11,
          add_time: 1547006262,
          up_time: 1547006285,
          __v: 0,
          req_body_other: '{"type":"object","title":"empty object","properties":{"page":{"type":"number"}},"required":["page"]}',
          markdown: '',
          desc: '',
          res_body: '{"type":"object","title":"empty object","properties":{"list":{"type":"array","items":{"type":"string"}}},"required":["list"]}',
          req_body_type: 'json',
          tag: [],
          index: 0,
          api_opened: false,
          res_body_is_json_schema: true,
          req_body_form: [],
          req_body_is_json_schema: true,
          req_params: [],
          req_headers: [
            {
              _id: '5c35714d0ce3e84becbd13cc',
              value: 'application/json',
              name: 'Content-Type',
              required: '1',
            },
          ],
          req_query: [],
          query_path: {
            path: '/post',
            params: [],
          },
          type: 'static',
          status: 'undone',
          edit_uid: 0,
        },
      ],
    },
  ],
}

module.exports = request
