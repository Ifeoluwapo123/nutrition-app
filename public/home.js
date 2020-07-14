const socket = io('/');
var input = document.getElementById('input');
var page = document.getElementById('food');
var num;

input.addEventListener('keypress', event =>{
	if(event.keyCode == 13){
		num = 1;
		let data = event.target.value;
		socket.emit('data', data);
		event.target.value = " ";
		page.innerHTML = '';
	}
});

socket.on('all_data', data =>{
	buildPage(data);
});

socket.on('error', mess=>{
	alert(mess);
});

function buildPage(data){
	spanNumber = document.createElement('span');
	divParent = document.createElement('div');
	divParent.className = "parent";
	divFirst = document.createElement('div');
	divFirst.className = "first";
	divSecond = document.createElement('div');
	divSecond.className = "second";
	divThird = document.createElement('div');
	divThird.className = "third";
	divFourth = document.createElement('div');
	divFourth.className = "fourth";
	divFifth = document.createElement('div');
	divFifth.className = "fifth";

	spanNumber.innerText = `#${num}`;
	num++;

	h4 = document.createElement('h4');
	h4.innerText = `${data.categoryLabel}: ${data.label}`;
	divFirst.appendChild(h4);

	img = document.createElement('img');
	if(data.image !== undefined){
		img.src = data.image;
	}else{
		img.src = "images/noimage.jpeg";
	}
	divSecond.appendChild(img);
	
	
	p = document.createElement('p');
	p.innerText = "Nutrient:";
	ul = document.createElement('ul');
	li1 = document.createElement('li');
	li2 = document.createElement('li');
	li3 = document.createElement('li');
	li4 = document.createElement('li');
	li1.innerText = `Enery: ${data.nutrients.ENERC_KCAL}kcal`;
	li2.innerText = `Protein: ${data.nutrients.PROCNT}g`;
	li3.innerText = `Fat: ${data.nutrients.FAT}g`;
	li4.innerText = `Carbohydrate: ${data.nutrients.CHOCDF}g`;
	ul.appendChild(li1);
	ul.appendChild(li2);
	ul.appendChild(li3);
	ul.appendChild(li4);
	divThird.appendChild(p);
	divThird.appendChild(ul);

	p1 = document.createElement('p');
	p2 = document.createElement('p');

    if(data.brand !== undefined) p1.innerText = `Brand: ${data.brand}`;
    else p1.innerText = "Brand: Null";
    
    if(data.category !== undefined) p2.innerText = `Category: ${data.category}`;
    else p2.innerText = "Category: Null";
    
	divFourth.appendChild(p1);
	divFourth.appendChild(p2);

	if(data.foodContentsLabel !== undefined) divFifth.innerText = `Food Components: ${data.foodContentsLabel}`;
	else divFifth.innerText = "Food Components: Null";
	
	divParent.appendChild(divFirst);
	divParent.appendChild(divSecond);
	divParent.appendChild(divThird);
	divParent.appendChild(divFourth);
	divParent.appendChild(divFifth);

	page.appendChild(spanNumber);
	page.appendChild(divParent);
}