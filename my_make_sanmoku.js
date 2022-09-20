const readline = require('readline');
//standard input string
let s,turn=0;
let is;
let period=true;
//駒の裏表　1は裏:2は表
//盤面
let board = [[0,2,2],[0,0,0],[0,0,0]];


const inputString = prompt =>{
    const readInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise( resolve =>readInterface.question(prompt,
        inputString=>{
            readInterface.close();
            resolve( inputString);
        }));
};

function o_board(){
//盤面の出力
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if(board[i][j]===1) {
                process.stdout.write('|○');
            }else if(board[i][j]===2){
                process.stdout.write('|●');
            }else{
                process.stdout.write('| ')
            }
        }
        process.stdout.write('\n-------');
        process.stdout.write('\n');
    }
}

//盤面に変更を加える

function sasite(str,flg){
    const rs =str.match(/\d{1,}/g);//rs[0]に行がrs[1]に列が入る
    if(!(/\d+?:\d+?$/.test(str)) || (rs[0]>=3 || rs[1]>=3 || rs[0]<0 || rs[1]<0)){
         console.log('正しく入力してください');
         return -1;
    }
    if(!(flg%2)){
        if(board[str[0]][str[2]]===1||board[str[0]][str[2]]===2){
            console.log("そこには石が置いてあります");
            return -1;
        }
        board[str[0]][str[2]]=2;
        return [str[0],str[2],[str[0]][str[2]]];
    }else{
        if(board[str[0]][str[2]]===1||board[str[0]][str[2]]===2){
            console.log("そこには石が置いてあります");
            return -1;
        }
        board[str[0]][str[2]]=1;
        return [str[0],str[2],board[str[0]][str[2]]];
    }
}
//駒の裏表　1は裏:2は表
//関数呼び出し位置がwhile文の中
function judge(){
    let handan=1;
    const decisionTable=
                        [ ["00","01","02"],//横
                          ["10","11","12"],//
                          ["20","21","22"],//
                          ["00","10","20"],//縦
                          ["01","11","21"],//縦
                          ["02","12","22"],//縦
                          ["00","11","22"],//ななめ
                          ["20","11","02"] ];//ななめ
    
    
    decisionTable.forEach(a=>{
        let temple=board[a[0][0]][a[0][1]].toString()+board[a[1][0]][a[1][1]].toString()
                    +board[a[2][0]][a[2][1]].toString();
        if(temple==='111'){
            console.log('裏の勝ち');
            handan=0;
        }
        if(temple==='222'){
            console.log('表の勝ち');
            handan=0;
        }
    });
    return handan;

}


//盤面への入力
async function inp(){
    do{//1手目のループ
        o_board();//描画
        s = await inputString("?行：?列＝");//入力
        sasite(s,turn);//入力判断及びパース***戻り値：行[0]/列[1]/座標の表裏[2]
        period=judge();
        turn++;
        console.log(`今は${turn}ターン１目`);
    }while(period);//変更とループでターンを表現
    o_board();
}


inp();

//手を指す
