function seriesk (n) {
	var pi=0;
	if(n>0){
		pi=seriesk(--n)+Math.pow(-1,n)/(2*n+1);
	}
	console.log(pi*4);
	return pi;
		 
}
seriesk(15000);