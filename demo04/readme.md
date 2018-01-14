
### webpack引入bootstrap方法

**1.参阅资料：**
* <https://www.jianshu.com/p/e1e0f31f8aba>
* vue中引入jQuery和bootstrap
* <https://www.cnblogs.com/haimishasha/p/6556410.html>
* <https://segmentfault.com/a/1190000006634772>
* 全部引入 和 部分引入参阅链接：https://stackoverflow.com/questions/34788771/unable-to-load-bootstrap-with-node-sass-bootstrap-sass


>我确实在引入bootstrap的时候，遇到一个神奇的错误。在webpack转译时报错，
    css-loader，unknown word样子的错误。对webpack.config.js文件加入一个
    include属性并指向到不存在的目录即可。

```js

    {
        test: /\.css$/,
        include: [
            path.resolve(__dirname, "not_exist_path")
        ],
        loader: "style!css"
    }

```

**2.前提：**

```hash
    // bootstrap依赖jquery:
    $ npm install jquery --save-dev
```

**3.两种方式：**

* 最原始方式，下载源码存放在某个目录下，直接引用

```js
    import 'bootstrap/js/bootstrap.min.js'
    import 'bootstrap/css/bootstrap.min.css'
```

* 直接安装bootstrap,通过node_module引进来

---

### bootstrap-sass官网重点解读

**1.参阅链接：**
* http://getbootstrap.com/css/#sass
* http://blog.csdn.net/gitmind/article/details/52261634
* https://www.npmjs.com/package/bootstrap-sass#d-npm--nodejs



**2.安装**

```bash
    $ npm install bootstrap-sass --save-dev


    // 也可以 $ npm install bootstrap --save-dev  这里主要讲bootstrap-sass
```

**3.引入注意点**

>  <p> 参阅官网Usage模块</p>
>  <p> 引入bootstrap，主要注意的点是：</p>
> <pre>1.boostrap引入主要包含两个部分，css（全部引入、部分引入）和 bootstrap.js；</pre>
>  <pre>2. bootstrap.js是依赖`jquery.js`</pre>
>  <pre>3. css 全部引入和 部分引入(glyphicons)，由于都在css里引用了字体图标，所以要先指定字体图标所在的目录;</pre>

```css
   /*eg:全部引入*/
   $icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
   @import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";


```

> <pre>4. 变量模块（@import "bootstrap/variables"）需要注意的变量 </pre>

```css

// 注意以下变量:
// 大部分变量都定义在： bootstrap-sass/assets/stylesheets/bootstrap/_variables下
// $icon-font-name 指定是字体图标的名字

//  $icon-font-path 指是字体图标所在的目录(这个变量需要手动指定所在目录地址)

// ~bootstrap-sass\assets\stylesheets\bootstrap\_glyphicons.scss
@at-root {
  // Import the fonts
  @font-face {
    font-family: 'Glyphicons Halflings';
    src: url(if($bootstrap-sass-asset-helper, twbs-font-path('#{$icon-font-path}#{$icon-font-name}.eot'), '#{$icon-font-path}#{$icon-font-name}.eot'));
    src: url(if($bootstrap-sass-asset-helper, twbs-font-path('#{$icon-font-path}#{$icon-font-name}.eot?#iefix'), '#{$icon-font-path}#{$icon-font-name}.eot?#iefix')) format('embedded-opentype'),
         url(if($bootstrap-sass-asset-helper, twbs-font-path('#{$icon-font-path}#{$icon-font-name}.woff2'), '#{$icon-font-path}#{$icon-font-name}.woff2')) format('woff2'),
         url(if($bootstrap-sass-asset-helper, twbs-font-path('#{$icon-font-path}#{$icon-font-name}.woff'), '#{$icon-font-path}#{$icon-font-name}.woff')) format('woff'),
         url(if($bootstrap-sass-asset-helper, twbs-font-path('#{$icon-font-path}#{$icon-font-name}.ttf'), '#{$icon-font-path}#{$icon-font-name}.ttf')) format('truetype'),
         url(if($bootstrap-sass-asset-helper, twbs-font-path('#{$icon-font-path}#{$icon-font-name}.svg##{$icon-font-svg-id}'), '#{$icon-font-path}#{$icon-font-name}.svg##{$icon-font-svg-id}')) format('svg');
  }
}

```

> <pre>5. webpack中css引入boostrap模块(node_module)下，的缩写方法</pre>

```css
    // Bootstrap
    $icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
    @import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";

    /* ~ 指的是webpack打包编译时指代当前项目下node_modules包里的样式文件，只在样式文件@import时这么用*/
    // 参阅链接：https://segmentfault.com/q/1010000006187201

```



* `css全部引入`

```js

    // Bootstrap
    $icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
    @import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";


```

```js
    // 所有功能目录引入所在文件
    // node_module/bootstrap-sass/assets/stylesheets/_bootstrap.scss

    // Core variables and mixins
    @import "bootstrap/variables";                  //变量模块
    @import "bootstrap/mixins";                     //方法，函数模块

    // Reset and dependencies
    @import "bootstrap/normalize";                  //重置样式模块
    @import "bootstrap/print";                      //打印样式模块
    @import "bootstrap/glyphicons";                 //图标模块

    // Core CSS
    @import "bootstrap/scaffolding";                //
    @import "bootstrap/type";                       //排版模块
    @import "bootstrap/code";                       //代码模块
    @import "bootstrap/grid";                       //栅格模块
    @import "bootstrap/tables";                     //表格模块
    @import "bootstrap/forms";                      //表单模块
    @import "bootstrap/buttons";                    //按键模块

    // Components
    @import "bootstrap/component-animations";       //组件动画模块
    @import "bootstrap/dropdowns";                  //下拉菜单模块
    @import "bootstrap/button-groups";              //按键组模块
    @import "bootstrap/input-groups";               //输入组模块
    @import "bootstrap/navs";                       //导航模块
    @import "bootstrap/navbar";                     //导航条模块
    @import "bootstrap/breadcrumbs";                //路径导航模块
    @import "bootstrap/pagination";                 //分页模块
    @import "bootstrap/pager";                      //页数模块
    @import "bootstrap/labels";                     //标签模块
    @import "bootstrap/badges";                     //微章模块
    @import "bootstrap/jumbotron";                  //巨幕模块
    @import "bootstrap/thumbnails";                 //缩略图模块
    @import "bootstrap/alerts";                     //警告模块
    @import "bootstrap/progress-bars";              //进度条模块
    @import "bootstrap/media";                      //媒体模块
    @import "bootstrap/list-group";                 //列表组模块
    @import "bootstrap/panels";                     //面板模块
    @import "bootstrap/responsive-embed";           //具有响应式内容的嵌入模块
    @import "bootstrap/wells";                      //Well模块
    @import "bootstrap/close";                      //

    // Components w/ JavaScript
    @import "bootstrap/modals";                         //模态框模块
    @import "bootstrap/tooltip";                        //提示信息模块
    @import "bootstrap/popovers";                       //弹出框模块
    @import "bootstrap/carousel";                       //carousel模块

    // Utility classes
    @import "bootstrap/utilities";                      //工具模块
    @import "bootstrap/responsive-utilities";           //自适应工具模块

```

* `css部分引入`

> 参阅项目: https://github.com/glenlzk/webpack_multi_entries_config/tree/master/demo03


```

    // 引入字体图标模块


    // ------------------------------src\assets\css\index.scss
    // 需要指定字体图标文件目录
    $icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
    // 如果不引入变量模块，会报错：$bootstrap-sass-asset-helper is undifined
    @import "~bootstrap-sass/assets/stylesheets/bootstrap/_variables";
    @import "~bootstrap-sass/assets/stylesheets/bootstrap/_glyphicons";


    // ------------------------------src\html\index.js
    import 'assets/css/index'

    // ---------------- src\html\index.html
    // 具体参阅官方中文文档: http://www.bootcss.com/
    <span class="glyphicon glyphicon-bold"></span>

```

```

    // 引入表格模块

    // ---------- src\assets\css\login.scss

    @import "~bootstrap-sass/assets/stylesheets/bootstrap/_variables";
    // 注意相关依赖变量报错后，如：undefined ^ No mixin named table-row-variant
    // 搜索node_modules\.3.3.7@bootstrap-sass\assets\stylesheets找到相关依赖引入即可
    @import "~bootstrap-sass/assets/stylesheets/bootstrap/mixins/_table-row";
    @import "~bootstrap-sass/assets/stylesheets/bootstrap/_tables";


    // --------- src\html\login.js
    import 'assets/css/login.scss'


    // --------- src\html\login.html

    <table class="table">
        <caption>Optional table caption.</caption>
        <thead>
        <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
        </tr>
        </tbody>
    </table>

```

* `js全部引入`

> 参阅项目: https://github.com/glenlzk/webpack_multi_entries_config/tree/master/demo03

```

    // ---------- src\assets\css\forget.scss

    // 全部引入
    $icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
    @import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";


    // ---------- src\html\forget.js

    // 前提: 已经安装好了jquery
     $ npm install jquery --save-dev
     $ npm install bootstrap-sass --save-dev

    // 引入scss
    import 'assets/css/forget'
    // 引入bootstrap.js
    // 主要参阅: bootstrap-sass模块下的package.json文件配置的main属性
    // "main": "assets/javascripts/bootstrap.js",
    import 'bootstrap-sass';

    // ---------- src\html\forget.html

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
        Launch demo modal
    </button>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>


```


* `js部分引入`

> 参阅项目: https://github.com/glenlzk/webpack_multi_entries_config/tree/master/demo03

```

    // ---------- src\html\findpassword.scss

    // 全部引入
    $icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
    @import "~bootstrap-sass/assets/stylesheets/_bootstrap.scss";

    // ---------- src\html\findpassword.js

    // 前提: 已经安装好了jquery
     $ npm install jquery --save-dev
     $ npm install bootstrap-sass --save-dev

    // 引入scss
    import 'assets/css/findpassword'
    // 引入下拉组件: bootstrap-sass > dropdown.js
    import 'bootstrap-sass/assets/javascripts/bootstrap/dropdown'



    // ---------- src\html\findpassword.html

    <nav id="navbar-example" class="navbar navbar-default navbar-static">
        <div class="container-fluid">
            <div class="navbar-header">
                <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".bs-example-js-navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Project Name</a>
            </div>
            <div class="collapse navbar-collapse bs-example-js-navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="dropdown">
                        <a id="drop1" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="drop1">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Separated link</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a id="drop2" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="drop2">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Separated link</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li id="fat-menu" class="dropdown">
                        <a id="drop3" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="drop3">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Separated link</a></li>
                        </ul>
                    </li>
                </ul>
            </div><!-- /.nav-collapse -->
        </div><!-- /.container-fluid -->
    </nav>




```
