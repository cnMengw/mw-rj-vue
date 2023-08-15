<?php
// modify 2019-3-7 19:54:13
if($_SERVER["REQUEST_METHOD"] == "OPTIONS"){
    header("HTTP/1.1 204 No Content");
    header('Content-Type:application/json; charset=utf-8');
    header('Access-Control-Allow-Methods:GET,PUT,POST,DELETE');
    header('Access-Control-Allow-Headers:x-requested-with,content-type,appid,authorization,token');
    header('Access-Control-Allow-Credentials:true');
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
    header('Access-Control-Allow-Origin:'. $origin);
    return;
}

header('Content-Type:application/json; charset=utf-8');
header('Access-Control-Allow-Methods:GET,PUT,POST,DELETE');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header('Access-Control-Allow-Credentials:true');
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
header('Access-Control-Allow-Origin:'. $origin);

function __echo__($json){
    $json = is_array($json) ? json_encode($json) : $json;
    $_start = "";
    $_end = "";
    if(isset($_GET["callback"])){
        $_start = $_GET["callback"] . "(";
        $_end = ")";
    }
    if(isset($_GET["jsonp"])){
        $_start = $_GET["jsonp"] . "(";
        $_end = ")";
    }
    if(isset($_GET["debug"])){
        $json = json_decode($json,true);
        echo '$json = ';
        var_export($json);
        echo ';';
        return;
    }
    echo $_start.$json.$_end;
}

$dirArray = explode('?', $_SERVER['REQUEST_URI']);
$filePathPhp  = $_SERVER["DOCUMENT_ROOT"].str_replace("/xdf-mock-php","",$dirArray[0])."/index.php";
$filePathJson = $_SERVER["DOCUMENT_ROOT"].str_replace("/xdf-mock-php","",$dirArray[0])."/index.json";

if(file_exists($filePathPhp)){
    $json = '';
    include $filePathPhp;
    __echo__($json);
}else{
    if(file_exists($filePathJson)){
        include $filePathJson;
    }else{
        echo '{"status":0, "msg":"msg=>数据模拟文件不存在！", "Status":0, "Msg":"Msg=>数据模拟文件不存在！"}';
    }
}