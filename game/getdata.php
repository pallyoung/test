<?php
$userName = $_POST["name"];
$userPhoneNum=$_POST["phone"];

header("Content-type: text/html; charset=utf-8");

define ( "DB_HOST", "127.0.0.1:3306" );
define ( "DB_USERNAME", "torealroot");
define ( "DB_PASSWORD", "root" );
$con = mysql_connect ( DB_HOST, DB_USERNAME, DB_PASSWORD );

if (! $con) {
	die ( 'Could not connect: ' . mysql_error () );
} else {
	$db_selected = mysql_select_db ("bdjs", $con );
	mysql_query("set names 'utf8'");
	$sql = "INSERT INTO bodajingshendatabase (user_name,user_phone) VALUES ('$userName','$userPhoneNum')";
	$result = mysql_query ( $sql, $con );
	mysql_close ( $con );
echo '提交成功!';
}

?>