$(function(){

	$("#d9").change(function(){			
		reCalculate();				
	});
	$("#d10").change(function(){
		reCalculate();
	});
	$("#d6").change(function(){
		reCalculate();
	});	
	$("#d21").change(function(){
		reCalculate();
	});	
	$("#d25").change(function(){
		reCalculate();
	});	
	$("#h21").change(function(){
		reCalculate();
	});	
	$("#h25").change(function(){
		reCalculate();
	});	

	$("#c26").tooltip();
	$("#c22").tooltip();
	$("#g22").tooltip();
	$("#g26").tooltip();

	function reCalculate() {

		var d9 = to_num($("#d9").val());
		var d10 = to_num($("#d10").val()); 
		var d6 = to_num($("#d6").val()); 

		var c14 = d9 * Math.pow( 1 + ( d10 / 100 ), d6); //C14=D9*(1+D10)^D6
		var c15 = c14 * (1 + (d10/100));
		var c16 = c15 * (1 + (d10/100));
		var c17 = c16 * (1 + (d10/100));
		var g18 = c17 * (1 + (d10/100));
	
		$("#c14").html( to_currency (c14) ) ;
		$("#c15").html( to_currency (c15) ) ;
		$("#c16").html( to_currency (c16) ) ;
		$("#c17").html( to_currency (c17) ) ;

		$("#g14").html( to_currency (c14) ) ;
		$("#g15").html( to_currency (c15) ) ;
		$("#g16").html( to_currency (c16) ) ;
		$("#g17").html( to_currency (c17) ) ;
		$("#g18").html( to_currency (g18) ) ;


		// for one-time investment //C22=C14/(1+D21)^D6 +  C15/(1+D21)^(D6+1)  +    C16/(1+D21)^(D6+1+1)  +   C17/(1+D21)^(D6+1+1+1)
		var d21 = to_num($("#d21").val()); 
		var c22 = (c14/(Math.pow( 1 + ( d21 / 100 ), d6))) + (c15/(Math.pow( 1 + ( d21 / 100 ), d6+1))) 
					+ (c16/(Math.pow( 1 + ( d21 / 100 ), d6+1+1))) + (c17/(Math.pow( 1 + ( d21 / 100 ), d6+1+1+1)));

		$("#c22").html( to_currency (c22) ) ;

		// many panyments
		var d25 = to_num($("#d25").val());
		// B26 =C14/(1+D21)^(D6-D25)  +    C15/(1+D21)^(D6-D25+1)  +   C16/(1+D21)^(D6-D25+1+1)   +    C17/(1+D21)^(D6-D25+1+1+1)
		var b26 = (c14/(Math.pow( 1 + ( d21 / 100 ), d6-d25))) + (c15/(Math.pow( 1 + ( d21 / 100 ), d6-d25+1))) 
					+ (c16/(Math.pow( 1 + ( d21 / 100 ), d6-d25+1+1))) + (c17/(Math.pow( 1 + ( d21 / 100 ), d6-d25+1+1+1)));

		// C26 =PMT(D21,D25,,-B26,1)
		var c26 = -pmt((d21/100),d25,null,b26,1);
		$("#c26").html( to_currency (c26) ) ;
		//console.log( to_currency(c26) );

		// one-time 5-year course
		// G22=G14/(1+H21)^D6+G15/(1+H21)^(D6+1)+G16/(1+H21)^(D6+1+1)+G17/(1+H21)^(D6+1+1+1)+G18/(1+H21)^(D6+1+1+1+1)
		var h21 = to_num($("#h21").val()); 
		var g22 = (c14/(Math.pow( 1 + ( h21 / 100 ), d6))) + (c15/(Math.pow( 1 + ( h21 / 100 ), d6+1))) 
					+ (c16/(Math.pow( 1 + ( h21 / 100 ), d6+1+1))) + (c17/(Math.pow( 1 + ( h21 / 100 ), d6+1+1+1)))
					+ (g18/(Math.pow( 1 + ( h21 / 100 ), d6+1+1+1+1)));
		$("#g22").html( to_currency (g22) ) ;		

		// multiple-payments 5-year course	
		var h25 = to_num($("#h25").val());
		// F26 =  G14/(1+H21)^(D6-H25)+G15/(1+H21)^(D6-H25+1)+G16/(1+H21)^(D6-H25+1+1)+G17/(1+H21)^(D6-H25+1+1+1)+G18/(1+H21)^(D6-H25+1+1+1+1)
		var f26 = (c14/(Math.pow( 1 + ( h21 / 100 ), d6-h25))) + (c15/(Math.pow( 1 + ( h21 / 100 ), d6-h25+1))) 
					+ (c16/(Math.pow( 1 + ( h21 / 100 ), d6-h25+1+1))) + (c17/(Math.pow( 1 + ( h21 / 100 ), d6-h25+1+1+1)))
					+  (g18/(Math.pow( 1 + ( h21 / 100 ), d6-h25+1+1+1+1)));

		// G26 = =PMT(H21,H25,,-F26,1)
		var g26 = -pmt((h21/100),h25,null,f26,1);
		$("#g26").html( to_currency (g26) ) ;
	}

	function to_num(x) {
		return isNaN( Number(x) ) ? 0 : Number(x)
	}

	function to_currency(x) {
		return numberWithCommas( x.toFixed(2) );
	}

	function numberWithCommas(x) {
    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	function pmt(rate_per_period, number_of_payments, present_value, future_value, type){
	    if(rate_per_period != 0.0){
	        // Interest rate exists
	        var q = Math.pow(1 + rate_per_period, number_of_payments);
	        return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

	    } else if(number_of_payments != 0.0){
	        // No interest rate, but number of payments exists
	        return -(future_value + present_value) / number_of_payments;
	    }

	    return 0;
	}	
});