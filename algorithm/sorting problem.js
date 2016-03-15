//算法中经典的排序问题
/*获取指定范围的随机整数*/
var getRandInt=function(min,max){
	var num=Math.random();
	num=min+num*(max-min);
	return Math.round(num);
}
/*随机生成指定大小的数组*/
var getArray=function (num) {
	if(num){
		var array=[];
		for(var i=0;i<num;i++){
			array.push(getRandInt(0,1000));
		}
		return array;
	}else{
		throw new Error("请指定数组大小");
	}
}
/*插入排序
Growth of Functions 增量法
*/
var insertSorting=function(array){
	var key=0;
	var array=array.slice();
	for(var i=1;i<array.length;i++){
		key=array[i];
		var j=i-1;
		while(j>=0&&array[j]>key){
			array[j+1]=array[j];
			j=j-1;
		}
		array[j+1]=key;

	}
	return array;
}
/*分治法
divide-and-conquer
*/
/*子过程*/
var merge=function(a,p,q,r){
		var n1=q-p+1;
		var n2=r-q;
		var L=[];
		var R=[];
		for(var i=0;i<n1;i++){
			L.push(a[p+i]);
		}
		for(var j=0;j<n2;j++){
			R.push(a[q+j+1]);
		}
		L.push(Infinity);
		R.push(Infinity);
		var i=0;
		var j=0;
		for(var k=p;k<r+1;k++){
			if(L[i]<=R[j]){
				a[k]=L[i];
				i=i+1;
			}else{
				a[k]=R[j];
				j=j+1;
			}

		}
	}
var divideSorting=function(a,p,r){	
	if(p<r){
		var q=Math.floor((r+p)/2);
		divideSorting(a,p,q);
		divideSorting(a,q+1,r);
		merge(a,p,q,r);
	}
	return a;

}

var main=function(){
	var array1=getArray(10000000);
	var array2=array1.slice();
	var array3=array1.slice();
	//console.log(JSON.stringify(array));
	var time1=Date.now();
	//array1=insertSorting(array1);
	time1=Date.now()-time1;
	var time2=Date.now();
	array2=divideSorting(array2,0,array2.length-1);
	time2=Date.now()-time2;
	//console.log(JSON.stringify(array));
	var time3=Date.now();
	array3.sort();
	time3=Date.now()-time3;
	console.log("插入排序耗时"+time1);
	console.log("分治法排序耗时"+time2);
	console.log("原生排序耗时"+time3);

};
main();