const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  mealName: state => state.order.mealName,
  snacksName: state => state.order.snacksName,
  remark: state => state.order.remark,
  totalPrice: state => state.order.totalPrice,
  timestamp: state => state.order.timestamp,
}
export default getters
