window.onload = (function() {

	
	var cart = [];//define array to hold ITEM obj

	var ItemsArr = function (name, price, qtd){ //setting up the obj
		this.name = name;
		this.price = price;
		this.qtd = qtd;
	};
	
	

	//click func to add items into the arr
	$(".tile").click(function(event){
		event.preventDefault(); //prevent a tag from it default behaivor

		//get attribute values from html page
		var itemName =  $(this).attr("data-name");	
		var itemPrice = Number($(this).attr("data-price"));		

		//alert(itemPrice + itemName);	

		addItem(itemName, itemPrice, 1);//adding items to the arr of objs
		
		displayCart();
	});


	//Add item to cart method
	function addItem(name,price,qtd) {
		// parameters <nam,price,qtd>

		 for(var i in cart){//statement to confirm if item is already listed...
			if (cart[i].name===name) {

			   cart[i].qtd++;
			   saveCart();			   
			   return;
			}
   		}

	    var item = new ItemsArr(name,price,qtd); //else item not listed add new item to cartArr
	   	console.log(item.name + item.price + item.qtd);
	    cart.push(item);
	    saveCart();//save arr to localStroge

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
	//count number of listed items
	function countCart() {
		// body...
		var count = 0;
		for (var i in cart) {
			count++;
		}
		return count;
	}

	//copy our list
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

	//display itemsArr method
	function displayCart() {
		// body...
		var cartArr = listCart();

		if (cartArr.length > 0) {//checking if there's any saved item 
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

