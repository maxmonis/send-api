const AppReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'UPLOAD_SUCCESS':
      const { original_name, name } = payload;
      return {
        ...state,
        original_name,
        name,
      };
    case 'SHOW_ALERT':
    case 'UPLOAD_FAIL':
      return {
        ...state,
        message: payload,
      };
    case 'HIDE_ALERT':
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default AppReducer;
