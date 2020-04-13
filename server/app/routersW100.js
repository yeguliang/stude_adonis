/**
 * Created by Fred(qq:24242811) on 2020/4/13.
 */
const Route = use("Route");
const Env = use("Env");

// // 无需登录
// Route.group(() => {
//   // 管理员
// })
//   .prefix("admin/v1")
//   .namespace("Admin");

// 需要登录
Route.group(() => {
  Route.resource("user", "UserController"); //用户地址
})
  // .prefix("admin/v1")
  .namespace("Admin");
// .middleware(["auth"]);

// // 文件上传接口
// Route.group(() => {
//   Route.post("file", "FileController.file");
//   Route.post("sms", "SendSmsController.smsTest"); //短信提醒
//   Route.post("importData", "ImportDataController.importData");
//   Route.get("logDataByExcelFile", "Admin/CollectionController.exportXLS"); //数据导出
//   Route.get(
//     "workerCollectionExportExcel",
//     "Admin/CollectionController.workerCollectionExportExcel"
//   ); //回收人员统计导出
//   Route.post("depponStatusPush", "DepponPushController.depponStatusPush");
// }).prefix("admin/v1");
