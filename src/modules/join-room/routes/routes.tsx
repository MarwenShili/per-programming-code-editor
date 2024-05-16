/* eslint-disable @typescript-eslint/no-explicit-any */
import RoomGuard from '@src/modules/shared/guards/RoomGuard'
import { RouteProps } from 'react-router-dom'
import { Fragment, lazy } from 'react'
import GuestLayout from '@src/modules/shared/layout/GuestLayout/GuestLayout'

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
    path: '/',
    component: lazy(() => import('../JoinRoom')),
    layout: GuestLayout,
  },
]

export default routes
