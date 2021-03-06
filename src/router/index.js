import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
]

export const asyncRoutes = [
  {
    path: '/mealOrder',
    component: Layout,
    meta: { roles: ['user'] },
    children: [
      {
        path: 'index',
        name: 'mealOrder',
        component: () => import('@/views/mealOrder/index'),
        meta: { title: '订餐', icon: 'table' }
      }
    ]
  },
  {
    path: '/list',
    component: Layout,
    meta: { roles: ['user'] },
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/list/index'),
        meta: { title: '清单', icon: 'shopping' }
      }
    ]
  },
  {
    path: '/updateUser',
    component: Layout,
    meta: { roles: ['user'] },
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/updateUser/index'),
        meta: { title: '头像设置', icon: 'people' }
      }
    ]
  },
  {
    path: '/userList',
    component: Layout,
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: 'userList',
        component: () => import('@/views/userList/index'),
        meta: { title: '用户管理', icon: 'people' }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: 'statistics',
        component: () => import('@/views/statistics/index'),
        meta: { title: '统计', icon: 'table', roles: ['user', 'admin'] }
      }
    ]
  },
  {
    path: '/menu',
    component: Layout,
    name: 'menu',
    meta: {
      title: '菜单',
      icon: 'tree-table',
      roles: ['admin']
    },
    children: [
      {
        path: 'setmeal',
        name: 'setmeal',
        component: () => import('@/views/menu/setmeal'),
        meta: { title: '套餐', icon: 'form' }
      },
      {
        path: 'snacks',
        name: 'snacks',
        component: () => import('@/views/menu/snacks'),
        meta: { title: '小食', icon: 'form' }
      }
    ]
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
