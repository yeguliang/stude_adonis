import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
import {createBrowserHistory as createHistory}  from 'history';
const app = dva({
  history: createHistory(),
});

// const app = dva();

// 2. Plugins:监听models中事件
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);
// 引入models
app.model(require('./models/indexPage').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
