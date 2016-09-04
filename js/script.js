window.onload = (function() {

	
	var cart = [];
	var ItemsArr = function (name, price, qtd){
		this.name = name;
		this.price = price;
		this.qtd = qtd;
	};
	
	

	//alert(localStorage.clickCount);
	$(".tile").click(function(event){
		event.preventDefault();
		//set the click counter to 1;	
		//count++;
		var itemName =  $(this).attr("data-name");	
		var itemPrice = Number($(this).attr("data-price"));
		//var itemQtd = 1;

		alert(itemPrice + itemName);	
		//acount++;				
		//$(".cart-count").html("Items " + Number(count));
		//localStorage.count = count;

		addItem(itemName, itemPrice, 1);
		
		displayCart();
	});


	//Add item to cart
	function addItem(name,price,qtd) {
		// body...
		 for(var i in cart){
			if (cart[i].name===name) {

			   cart[i].qtd++;
			   saveCart();			   
			   return;
			}
   		}

	    var item = new ItemsArr(name,price,qtd);
	   	console.log(item.name + item.price + item.qtd);
	    cart.push(item);
	    saveCart();

		console.log(cart);
	}

	//removeItem
	function removeItem(name) {
		// body...
		for(var i in cart){
			if (cart[i].name === name) {
				cart[i].qtd--;
				if (cart[i].qtd == 0) {
					cart.splice(i, 1)
				}
				break;
			}
		}
	}

	function removeItemFromCartAll(name)
	{
	   for(var i in cart)
	   {
	       if (cart[i].name===name) {
	         cart.splice(i,1);
	         break;
	       }
	   }
	   saveCart();
	}
	//clearCart()
	function clearCart()
	{
	   cart = [];
	   saveCart();
	}
	//totalCart()
	function totalCart()
	{

	   var totalCost = 0;
	   for(var i in cart)
	   {
	       totalCost += cart[i].price * cart[i].qtd;
	   }
	   return totalCost.toFixed(2);

	}

	function countCart() {
		// body...
		var count = 0;
		for (var i in cart) {
			count++;
		}
		return count;
	}
	//listCart() //return arr
	function listCart()
	{
	   var cartCopy= [];
	   for(var i in cart) {
	     	var item= cart[i];
	      	var itemCopy= {};

	      	for(var p in item){
	        	itemCopy[p]= item[p];
	      	}

	      itemCopy.total=(item.price*item.qtd).toFixed(2);
	      cartCopy.push(itemCopy);
  		}

  		return cartCopy;
  	}
	//saveCart()
	function saveCart()
	{
		localStorage.setItem("ShoppingCart", JSON.stringify(cart));
	}
	//loadCart()
	function loadCart()
	{
		cart = JSON.parse(localStorage.getItem("ShoppingCart"));
	}


	function displayCart() {
		// body...
		var cartArr = listCart();

		if (cartArr.length > 0) {
			var output = "<tr><td>Item</td><td>Price</td><td>Qtd</td></tr>";

			for(var i in cartArr){
				output +="<tr>"
				output += "<td>" + cartArr[i].name + "</td><td>" + cartArr[i].price + "</td><td>" + cartArr[i].qtd +"</td>"
				output +="</tr>"
			}

			
			$("#show-cart").html(output);
			$("#total-cart").html(totalCart());
			$(".cart-count").html("Items " + countCart());
		}
		else{
			var output = "<p> Cart is empty </p>"
			$(".cart-content").html(output);
		}
	}


	//load cart if its not empty it loads the current the strored data
	if (loadCart() != null) {
		loadCart();
	}
	var array  = listCart();
	console.log(array);
	displayCart();

});

