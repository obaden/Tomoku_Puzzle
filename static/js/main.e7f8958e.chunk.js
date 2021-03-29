(this.webpackJsonptomoku=this.webpackJsonptomoku||[]).push([[0],{10:function(e,t,a){e.exports=a(19)},15:function(e,t,a){},17:function(e,t,a){},18:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var r=a(0),o=a.n(r),n=a(8),s=a.n(n),l=(a(15),a(6)),i=a.n(l),c=a(9),u=a(1),h=a(2),d=a(4),m=a(3),p=a(5),v=(a(17),function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e="";switch(this.props.type){case 0:e="empty";break;case 1:e="square";break;case 2:e="topNode";break;case 3:e="bottomNode";break;case 4:e="leftNode";break;case 5:e="rightNode"}return o.a.createElement("div",{onMouseUp:this.props.handleMouseUp,onMouseDown:this.props.handleMouseDown,onMouseEnter:this.props.handleMouseEnter,className:"Node ".concat(e)})}}]),t}(o.a.Component)),b=(a(18),0),g=1,w=2,f=3,x=4,k=5,S={rowSquares:[3,0,1,2],colSquares:[3,0,0,0,1,1,1],vertBoxes:[0,1,1,1,0,0,1],horzBoxes:[1,2,2,2]},E={rowSquares:[2,0,0,1,1,2],colSquares:[1,2,0,1,0,0,0,0,0,0,1,1],vertBoxes:[2,1,2,2,3,2,1,1,2,3,2,2],horzBoxes:[3,2,1,0,1,3]},y={rowSquares:[3,2,0,0,0,1,1,0,3],colSquares:[1,1,0,1,1,0,1,0,0,0,1,0,0,4],vertBoxes:[3,2,2,1,1,2,2,3,3,3,3,3,2,1],horzBoxes:[3,1,2,3,4,3,3,4,4]},B=function(e){function t(){var e;Object(u.a)(this,t),(e=Object(d.a)(this,Object(m.a)(t).call(this))).setBoard=function(t){e.setState({board:e.emptyGrid(t.rowSquares.length,t.colSquares.length),cornerCount:e.emptyGrid(t.rowSquares.length+1,t.colSquares.length+1),rowSquares:t.rowSquares.slice(),colSquares:t.colSquares.slice(),vertBoxes:t.vertBoxes.slice(),horzBoxes:t.horzBoxes.slice(),currentBoard:t})},e.emptyGrid=function(e,t){for(var a=[],r=0;r<e;r++){for(var o=[],n=0;n<t;n++)o.push(b);a.push(o)}return a},e.handleMouseDown=function(t,a){var r=e.state,o=r.board;r.solving||(o[t][a]===b?(e.addPiece(t,a,g),e.setState({draggingFrom:[t,a]})):e.removePiece(t,a))},e.handleMouseUp=function(){e.setState({draggingFrom:null})},e.handleMouseEnter=function(t,a){if(!e.state.solving){var r=e.state.draggingFrom;e.state.draggingFrom&&e.state.board[t][a]===b&&(t===r[0]?a===r[1]-1?(e.removePiece(r[0],r[1]),e.addPiece(t,a,x),e.handleMouseUp()):a===r[1]+1&&(e.removePiece(r[0],r[1]),e.addPiece(r[0],r[1],x),e.handleMouseUp()):a===r[1]&&(t===r[0]-1?(e.removePiece(r[0],r[1]),e.addPiece(t,a,w),e.handleMouseUp()):t===r[0]+1&&(e.removePiece(r[0],r[1]),e.addPiece(r[0],r[1],w),e.handleMouseUp())))}},e.copyGrid=function(e){var t=[];return e.forEach((function(e){t.push(e.slice())})),t},e.addPiece=function(t,a,r){var o=e.state,n=o.board,s=o.colSquares,l=o.rowSquares,i=o.vertBoxes,c=o.horzBoxes,u=o.cornerCount,h=e.copyGrid(n);switch(r){case g:if(!(s[a]>0&&l[t]>0))return!1;h[t][a]=g,u[t][a]++,u[t][a+1]++,u[t+1][a+1]++,u[t+1][a]++,s[a]--,l[t]--;break;case x:if(!(c[t]>0))return!1;h[t][a]=x,h[t][a+1]=k,u[t][a]++,u[t][a+2]++,u[t+1][a+2]++,u[t+1][a]++,c[t]--;break;case w:if(!(i[a]>0))return!1;h[t][a]=w,h[t+1][a]=f,u[t][a]++,u[t][a+1]++,u[t+2][a+1]++,u[t+2][a]++,i[a]--;break;default:return}return e.setState({board:h}),!0},e.removePiece=function(t,a){var r=e.state,o=r.board,n=r.colSquares,s=r.rowSquares,l=r.vertBoxes,i=r.horzBoxes,c=r.cornerCount,u=e.copyGrid(o);switch(u[t][a]){case x:u[t][a+1]=b,c[t][a]--,c[t][a+2]--,c[t+1][a+2]--,c[t+1][a]--,i[t]++;break;case k:u[t][a-1]=b,c[t][a-1]--,c[t][a+1]--,c[t+1][a+1]--,c[t+1][a-1]--,i[t]++;break;case w:u[t+1][a]=b,c[t][a]--,c[t][a+1]--,c[t+2][a+1]--,c[t+2][a]--,l[a]++;break;case f:u[t-1][a]=b,c[t-1][a]--,c[t-1][a+1]--,c[t+1][a+1]--,c[t+1][a]--,l[a]++;break;case g:c[t][a]--,c[t][a+1]--,c[t+1][a+1]--,c[t+1][a]--,n[a]++,s[t]++}u[t][a]=b,e.setState({board:u})},e.sleep=function(e){return new Promise((function(t){return setTimeout(t,e)}))},e.getValidMoves=function(t){var a=e.state,r=a.rowSquares,o=a.colSquares,n=a.vertBoxes,s=a.horzBoxes,l=a.board,i=[];return s[t.row]>0&&l[0].length>t.col+1&&i.push({row:t.row,col:t.col,type:x}),n[t.col]>0&&l.length>t.row+1&&l[t.row+1][t.col]===b&&i.push({row:t.row,col:t.col,type:w}),r[t.row]>0&&o[t.col]>0&&i.push({row:t.row,col:t.col,type:g}),i},e.nextPos=function(t){var a=e.state.board;do{t.row===a.length-1&&t.col++,t.row=(t.row+1)%a.length}while(t.col<a[0].length&&a[t.row][t.col]!==b);return t},e.isCorrect=function(){for(var t=e.state,a=t.rowSquares,r=t.colSquares,o=t.vertBoxes,n=t.horzBoxes,s=0;s<a.length;s++)if(0!==a[s])return!1;for(var l=0;l<r.length;l++)if(0!==r[l])return!1;for(var i=0;i<o.length;i++)if(0!==o[i])return!1;for(var c=0;c<n.length;c++)if(0!==n[c])return!1;return!0},e.isValid=function(){for(var t=e.state.cornerCount,a=0;a<t.length;a++)for(var r=0;r<t[0].length;r++)if(t[a][r]>=3)return!1;return!0};var a=S;return e.state={board:e.emptyGrid(a.rowSquares.length,a.colSquares.length),cornerCount:e.emptyGrid(a.rowSquares.length+1,a.colSquares.length+1),rowSquares:a.rowSquares.slice(),colSquares:a.colSquares.slice(),vertBoxes:a.vertBoxes.slice(),horzBoxes:a.horzBoxes.slice(),currentBoard:a,draggingFrom:null,solving:!1,stop:!1},e}return Object(p.a)(t,e),Object(h.a)(t,[{key:"solve",value:function(){var e=Object(c.a)(i.a.mark((function e(t){var a,r,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({solving:!0}),this.setBoard(this.state.currentBoard),e.next=4,this.sleep(40);case 4:r={row:0,col:0},a=(a=[]).concat(this.getValidMoves(r));case 7:if(!(a.length>0)){e.next=37;break}if(!this.state.stop){e.next=11;break}return this.setState({stop:!1,solving:!1}),e.abrupt("return");case 11:if((o=a.pop()).row!==r.row||o.col!==r.col){e.next=31;break}return this.addPiece(o.row,o.col,o.type),e.next=16,this.sleep(t);case 16:if(!this.isValid()){e.next=26;break}if(a.push(o),!((r=this.nextPos(r)).col>=this.state.board[0].length)){e.next=23;break}return e.abrupt("break",37);case 23:a=a.concat(this.getValidMoves(r));case 24:e.next=29;break;case 26:return this.removePiece(o.row,o.col),e.next=29,this.sleep(t);case 29:e.next=35;break;case 31:return this.removePiece(o.row,o.col),e.next=34,this.sleep(t);case 34:r={row:o.row,col:o.col};case 35:e.next=7;break;case 37:this.setState({solving:!1});case 38:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state,a=t.board,r=t.rowSquares,n=t.colSquares,s=t.vertBoxes,l=t.horzBoxes,i=t.solving,c=[];if(this.state.colSquares)for(var u=0;u<n.length;u++){for(var h=[],d=0;d<s[u];d++)h.push(o.a.createElement("div",{className:"tallBox",key:2*d}));for(var m=0;m<n[u];m++)h.push(o.a.createElement("div",{className:"box",key:2*m+1}));c.push(h)}var p=[];if(this.state.rowSquares)for(var b=0;b<r.length;b++){for(var g=[],w=0;w<l[b];w++)g.push(o.a.createElement("div",{className:"longBox",key:2*w}));for(var f=0;f<r[b];f++)g.push(o.a.createElement("div",{className:"box",key:2*f+1}));p.push(g)}var x=o.a.createElement("h2",{id:"correct"},"Correct!"),k=o.a.createElement("h2",{id:"invalid"},"Invalid! too many corners touching");return o.a.createElement("div",{className:"contents"},o.a.createElement("div",{className:"Menu"},o.a.createElement("div",{className:"control"},o.a.createElement("button",{onClick:function(){i?e.setState({stop:!0}):e.solve(20)}},i?"Stop":"Solve"),o.a.createElement("button",{disabled:i,onClick:function(){e.setState(e.setBoard(e.state.currentBoard))}},"Reset Board")),o.a.createElement("div",{className:"board-select"},"Select board",o.a.createElement("button",{disabled:i,onClick:function(){return e.setBoard(S)}},"Small"),o.a.createElement("button",{disabled:i,onClick:function(){return e.setBoard(E)}},"Medium"),o.a.createElement("button",{disabled:i,onClick:function(){return e.setBoard(y)}},"Large")),o.a.createElement("div",{className:"message"},i?"":this.isCorrect()?x:this.isValid()?"":k)),o.a.createElement("div",{style:{height:2*a.length*50+"px"},className:"Board"},a.map((function(t,a){return o.a.createElement("div",{className:"Row",key:a},t.map((function(t,r){return o.a.createElement(v,{handleMouseUp:e.handleMouseUp,handleMouseDown:function(){e.handleMouseDown(a,r)},handleMouseEnter:function(){e.handleMouseEnter(a,r)},type:t,key:r})})),o.a.createElement("div",{className:"AvailableRow"},p[a]))})),o.a.createElement("div",{className:"verticalItems"},this.state.board[0].map((function(e,t){return o.a.createElement("div",{className:"AvailableCol",key:t},c[t])})))),o.a.createElement("div",{className:"Instructions"},o.a.createElement("h1",null,"Instructions"),o.a.createElement("p",null,"Tomoku is a puzzle game where the goal is to place all available pieces shown along the edges, into the grid. The pieces need to be placed into the grid in such a way that there are never 4 corners meeting at a single point"),o.a.createElement("img",{src:"./images/invalid.png",alt:"example of 4 corners touching"}),o.a.createElement("p",null,"The above is an example of an invalid arrangement since there are 4 corners touching at the point circled in red"),o.a.createElement("p",null,"You can only place pieces onto the board at locations where there are pieces available. The available pieces are listed along the sides and are unique to that row/column. The below image shows the available pieces for the first row. As you can see, it must contain a single horizontal box and three square. The rest of the empty spaces will then need to be filled with vertical boxes since they are not displayed here. If i placed a horizontal box in row 1, I would not be able to place another one in that row since we see that there is only one available"),o.a.createElement("img",{src:"./images/available.jpg",alt:"first row"}),o.a.createElement("p",null,"Horizontal and vertical boxes can be placed anywhere within their rows or columns respectively. However, squares are counted in both the row and the column, so in order to place a square at a given position, there must be one available in both the given row and the column."),o.a.createElement("h3",null,"Controls"),o.a.createElement("p",null,"To place a square, simply click on a valid position on the board.",o.a.createElement("br",null),"To place a horizontal or vertical box, click where you want the box to start and drag onto the other point of the box while holding down the mouse. A box will only be placed if there is one available for that location."),o.a.createElement("img",{height:"100x",src:"./images/horizontal.gif",alt:"animation showing how to place box"}),o.a.createElement("p",null,"To remove a box, simply click on it again."),o.a.createElement("img",{height:"100x",src:"./images/remove.gif",alt:"animation showing how to remove box"}),o.a.createElement("p",null,"Different boards can be selected at the top. But be careful since progress on your current board will not be saved.",o.a.createElement("br",null),"You can also press solve and the computer will start solving the board visually using backtracking.")))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[10,1,2]]]);
//# sourceMappingURL=main.e7f8958e.chunk.js.map