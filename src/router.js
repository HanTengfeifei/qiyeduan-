import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route,  } from 'dva/router';
import dynamic from 'dva/dynamic';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from './containers/App';
import Login1 from './routes/Pages/Login';
import Register from './routes/Pages/register/Register' ;
import NotFound from './routes/NotFound/NotFound';
import Home from './fanhua-routes/ProductCity/HomePage';
import ProductCityOrder from './fanhua-routes/ProductCity/ProductCityOrder';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className="globalSpin" />;
});
const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/homepage',
      component: () => import('./fanhua-routes/HomePage/Homepage'),
    },
    // {
    //   path: '/Login1',
    //   component: () => import('./routes/Pages/Login'),
    // },
    {
      path: '/AddMerchandiseControl',
      component: () => import('./fanhua-routes/Trade/MerchandiseControl/AddMerchandiseControl'),
    },
    {
      path: '/roleAll',
      component: () => import('./fanhua-routes/RoleAll/RoleAll'),
    },
    // {
    //   path:'/register',
    //   component: () => import('./routes/Pages/register/Register'),
    // },
    {
      path: '/MenusManagement',
      component: () => import('./fanhua-routes/MenusManagement/MenuAll'),
    },
    {
      path: '/DoManagement',
      component: () => import('./fanhua-routes/DoManagement/DoAll'),
    },
    {
      path: '/waybilllist',
      component: () => import('./fanhua-routes/Logistics/WayBill/WayBillList')
    },
    {
      path: '/reconditList',
      component: () => import('./fanhua-routes/Logistics/Reconditioning/ReconditioningList'),
    },{
      path: '/ShowCarDetails',
      component: () => import('./fanhua-routes/Logistics/Reconditioning/ShowCarDetails'),
    },
    {
      path: '/AddOrderAll',
      component: () => import('./fanhua-routes/Trade/OrderList/AddOrderAll'),
    },
    {
    path: '/EditMerchandiseControl',
      component: () => import('./fanhua-routes/Trade/MerchandiseControl/EditMerchandiseControl'),
    },
    {
      path: '/companyInformation',
      component: () => import('./fanhua-routes/CompanyManagement/CompanyInformmation/CompanyInformation'),
    },
    {
      path: '/EmployeeManagement',
      component: () => import('./fanhua-routes/CompanyManagement/EmployeeManagement/MyEmployeeManagementss'),
    },
    {
      path: '/PropertyManagement',
      component: () => import('./fanhua-routes/CompanyManagement/PropertyManagement/PropertyManagement'),
    },
    {
      path: '/planlist',
      component: () => import('./fanhua-routes/Trade/PlanList/PlanListTabs')
    },
    {
      path: '/showplanlist',
      component: () => import('./fanhua-routes/Customer/CustomerList/ShowPlanList')
    },
    {
      path: '/orderlist',
      component: () => import('./fanhua-routes/Trade/OrderList/OrderList')
    },
    {
      path: '/orderlistthree',
      component: () => import('./fanhua-routes/Trade/OrderList/OrderListThree')
    },
    {
      path: '/orderlisttwo',
      component: () => import('./fanhua-routes/Trade/OrderList/OrderListTwo/OrderListTwo')
    },
    {
      path: '/addorderallbuyer',
      component: () => import('./fanhua-routes/Trade/OrderList/OrderListTwo/AddOrderAllBuyer')
    },
    {
      path: '/addOrderallsaler',
      component: () => import('./fanhua-routes/Trade/OrderList/OrderListTwo/saler/AddOrderAllSaler')
    },
    {
      path: '/orderlistdetailtwo',
      component: () => import('./fanhua-routes/Trade/OrderList/OrderListTwo/OrderListDetailsTwo')
    },
    {
      path: '/orderlisttwo',
      component: () => import('./fanhua-routes/Trade/OrderList/OrderListTwo/OrderListTwo')
    },
    {
      path: '/offlineaddorder',
      component: () => import('./fanhua-routes/Trade/OrderList/OfflineAddOrder')
    },
    {
      path: '/offlinecgaddorder',
      component: () => import('./fanhua-routes/Trade/OrderList/OfflinecgAddOrder')
    },
    {
      path: '/orderlistdetail',
      component: () => import('./fanhua-routes/Trade/OrderList/OrderListDetails')
    },
    {
      path: '/orderlistdetailthree',
      component: () => import('./fanhua-routes/Trade/OrderList/OrderListDetailsthree')
    },
    {
      path: '/merchandisemontrol',
      component: () => import('./fanhua-routes/Trade/MerchandiseControl/MerchandiseControl')
    },

    {
      path: '/waybilldetaillist',
      component: () => import('./fanhua-routes/Logistics/WayBill/WayBillDetailList')
    },
    {
      path: '/exitwaybilldetaillist',
      component: () => import('./fanhua-routes/Logistics/ExitList/Tabs/ExitWayBillDetailList')
    },
    {
      path:'/echarthomepage',
      component: () => import('./fanhua-routes/echarthomepage/EchartHomepage')
    },
    {
      path: '/exitlist',
      component: () => import('./fanhua-routes/Logistics/ExitList/ExitList')
    },
    {
      path:'/balancelist',
      component: () => import('./fanhua-routes/Logistics/BalanceList/BalanceList')
    },
    {
      path:'/balacedetaillisttwo',
      component: () => import('./fanhua-routes/Logistics/BalanceList/BalaceDetailListTwo')
    },
    {
      path:'/balacedetaillist',
      component: () => import('./fanhua-routes/Logistics/BalanceList/BalaceDetailList')
    },
    {
      path:'/supplierlist',
      component: () => import('./fanhua-routes/Supplier/SupplierList/SupplierList'),
    },
    {
      path:'/fieldstationlist',
      component: () => import('./fanhua-routes/FieldStation/FieldStationList/FieldStationList'),
    },
    {
      path:'/contractmanagement',
      component: () => import('./fanhua-routes/Contract/ContractManagement/ContractManagement'),
    },
    {
      path:'/customerlist',
      component: () => import('./fanhua-routes/Customer/CustomerList/CustomerList'),
    },
    {
      path:'/customerlistdetail',
      component: () => import('./fanhua-routes/Customer/CustomerList/ShowCustomerDetails'),
    },
    {
      path:'/customerbilllistdetail',
      component: () => import('./fanhua-routes/Customer/CustomerList/CustomerBillListTable'),
    },
    {
      path:'/supplierlistdetail',
      component: () => import('./fanhua-routes/Supplier/SupplierList/ShowSupplierDetails'),
    },
    {
      path:'/supplierbilllistdetail',
      component: () => import('./fanhua-routes/Supplier/SupplierList/SupplierBillListTable'),
    },
    {
      path:'/customerpayment',
      component: () => import('./fanhua-routes/Accounting/CollectDebt/CollectDebt'),
    },
    {
      path:'/accountinglist',
      component: () => import('./fanhua-routes/Accounting/AccountingList/AccountingList'),
    },
    {
      path:'/businessstatistics',
      component: () => import('./fanhua-routes/Accounting/BusinessStatistics/BusinessStatistics'),
    },
    {
      path: '/mail',
      component: () => import('./routes/Mail/Mail'),
    },
    {
      path: '/profile',
      component: () => import('./routes/Pages/Profile'),
    },
    {
      path: '/blank',
      component: () => import('./routes/Pages/Blank'),
    },
    {
      path: '/staiondetail',
      component: () => import('./fanhua-routes/FieldStation/FieldStationList/FieldStationDetail'),
    },
    {
      path: '/login',

      component: () => import('./routes/Pages/Login'),
    },
    {
      path: '/loglist',
      component: () => import('./fanhua-routes/Log/LogList/LogList'),
    },
    {
      path: '/signup',
      component: () => import('./routes/Pages/Signup'),
    },
    {
      path: '/lock',
      component: () => import('./routes/Pages/Lock'),
    },
    {
      path: '/affix',
      component: () => import('./routes/Navigation/Affix')
    },
    {
      path: '/pagination',
      component: () => import('./routes/Navigation/Pagination')
    },
    {
      path: '/breadcrumb',
      component: () => import('./routes/Navigation/Breadcrumb')
    },
    {
      path: '/steps',
      component: () => import('./routes/Navigation/Steps')
    },
    {
      path: '/avatar',
      component: () => import('./routes/UI/Avatar')
    },
    {
      path: '/button',
      component: () => import('./routes/UI/Button')
    },
    {
      path: '/icon',
      component: () => import('./routes/UI/Icon')
    },
    {
      path: '/tag',
      component: () => import('./routes/UI/Tag')
    },
    {
      path: '/switch',
      component: () => import('./routes/UI/Switch')
    },
    {
      path: '/calendar',
      component: () => import('./routes/UI/Calendar')
    },
    {
      path: '/checkbox',
      component: () => import('./routes/UI/Checkbox')
    },
    {
      path: '/radio',
      component: () => import('./routes/UI/Radio')
    },
    {
      path: '/input',
      component: () => import('./routes/UI/Input')
    },
    {
      path: '/timeline',
      component: () => import('./routes/UI/Timeline')
    },
    {
      path: '/badge',
      component: () => import('./routes/UI/Badge')
    },
    {
      path: '/slider',
      component: () => import('./routes/UI/Slider')
    },
    {
      path: '/popconfirm',
      component: () => import('./routes/Display/Popconfirm')
    },
    {
      path: '/popover',
      component: () => import('./routes/Display/Popover')
    },
    {
      path: '/notification',
      component: () => import('./routes/Display/Notification')
    },
    {
      path: '/message',
      component: () => import('./routes/Display/Message')
    },
    {
      path: '/alert',
      component: () => import('./routes/Display/Alert')
    },
    {
      path: '/tooltip',
      component: () => import('./routes/Display/Tooltip')
    },
    {
      path: '/collapse',
      component: () => import('./routes/Display/Collapse')
    },
    {
      path: '/tree',
      component: () => import('./routes/Display/Tree')
    },
    {
      path: '/treeselect',
      component: () => import('./routes/Display/TreeSelect')
    },
    {
      path: '/modal',
      component: () => import('./routes/Display/Modal')
    },
    {
      path: '/tabs',
      component: () => import('./routes/Display/Tabs')
    },
    {
      path: '/carousel',
      component: () => import('./routes/Display/Carousel')
    },
    {
      path: '/progress',
      component: () => import('./routes/Display/Progress')
    },
    {
      path: '/mention',
      component: () => import('./routes/Entry/Mention')
    },
    {
      path: '/rate',
      component: () => import('./routes/Entry/Rate')
    },
    {
      path: '/select',
      component: () => import('./routes/Entry/Select')
    },
    {
      path: '/transfer',
      component: () => import('./routes/Entry/Transfer')
    },
    {
      path: '/dropdown',
      component: () => import('./routes/Entry/Dropdown')
    },
    {
      path: '/autocomplete',
      component: () => import('./routes/Entry/AutoComplete')
    },
    {
      path: '/cascader',
      component: () => import('./routes/Entry/Cascader')
    },
    {
      path: '/datepicker',
      component: () => import('./routes/Entry/DatePicker')
    },
    {
      path: '/timepicker',
      component: () => import('./routes/Entry/TimePicker')
    },
    {
      path: '/baseform',
      component: () => import('./routes/Form/BaseForm')
    },
    {
      path: '/advancedform',
      component: () => import('./routes/Form/AdvancedForm')
    },
    {
      path: '/advancedsearch',
      component: () => import('./routes/Form/AdvancedSearch')
    },
    {
      path: '/basetable',
      component: () => import('./routes/Table/BaseTable')
    },
    {
      path: '/advanced',
      component: () => import('./routes/Table/Advanced')
    },
    {
      path: '/playground',
      component: () => import('./routes/Table/Playground')
    },
    {
      path: '/custable',
      component: () => import('./routes/Table/CusTable')
    },
    {
      path: '/grid',
      component: () => import('./routes/Layout/Grid')
    },
    {
      path: '/gridplayground',
      component: () => import('./routes/Layout/GridPlayground')
    },
    {
      path: '/layout',
      component: () => import('./routes/Layout/Layout')
    },
    {
      path: '/card',
      component: () => import('./routes/Layout/Card')
    },
    {
      path: '/menu',
      component: () => import('./routes/Layout/Menu')
    },
    {
      path: '/logogather',
      component: () => import('./routes/AntMotion/LogoGather')
    },
    {
      path: '/tableanim',
      component: () => import('./routes/AntMotion/TableAnim')
    },
    {
      path: '/listanim',
      component: () => import('./routes/AntMotion/ListAnim')
    },
    {
      path: '/detailswitch',
      component: () => import('./routes/AntMotion/DetailSwitch')
    },
    {
      path: '/listsort',
      component: () => import('./routes/AntMotion/ListSort')
    },
    {
      path: '/picanim',
      component: () => import('./routes/AntMotion/PicAnim')
    },
    {
      path: '/banneranim',
      component: () => import('./routes/AntMotion/BannerAnim')
    },
    {
      path: '/datareport',
      component: () => import('./fanhua-routes/DataReport/DataReport')
    },
    {
      path: '/about',
      component: () => import('./routes/About/About')
    }
  ]

  const Notfound = dynamic({
    app,
    component: () => NotFound,
  })

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route  exact path="/Home" component={Home}/>
          <Route  exact path="/Login1" component={Login1}/>
          <Route  exact path="/register" component={Register}/>
          <Route  exact path="/ProductCityOrder" component={ProductCityOrder}/>

        <App>
          <Switch>
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route
                  key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Route component={Notfound} />
          </Switch>
        </App>
        </Switch>
      </Router>
    </LocaleProvider>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers;
