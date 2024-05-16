/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from '@src/modules/shared/layout/MainLayout/MainLayout'
import RoomGuard from '@src/modules/shared/guards/RoomGuard'
import { RouteProps } from 'react-router-dom'
import { Fragment, lazy } from 'react'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  // AuthGuard Routes
  {
    exact: true,
    guard: RoomGuard,
    path: '/editor/:roomId',
    component: lazy(() => import('../EditorPage')),
    layout: MainLayout,
  },
]

export default routes
