const express = require("express")
const UserRoutes = require("../modules/user/user.route")
const OrderRoutes = require("../modules/order/order.route")
const BrandRoutes = require("../modules/brand/brand.route")
const CategoryRoutes = require("../modules/category/category.route")
const ProductRoutes = require("../modules/product/product.route")
const SubCategoryRoutes = require("../modules/subCategory/subCategory.route")

const routes = express.Router()

const routesList = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/brands",
    route: BrandRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/sub-category",
    route: SubCategoryRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
]

routesList.forEach((route) => routes.use(route.path, route.route))

module.exports = routes
