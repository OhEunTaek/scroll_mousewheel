const sections = document.querySelectorAll('section');
const lis = document.querySelectorAll('ul li');

const base = -500;
const ul = document.querySelector("ul");//6의추가
const lis_arr = Array.from(lis); //6의 추가

const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
//5 posArr 시작 
let posArr = null;

let enableClick = true; //7리사이즈

setPos();
function setPos() {
	posArr = [];
	for (let el of sections) {
		posArr.push(el.offsetTop);
	}
}
//5 posArr이 초기화되도록 하면서 함수로 만든다

// for (let el of sections) {
// 	posArr.push(el.offsetTop);
// }


//6 브라우저에서 마우스 휠만으로 하나의 섹션이 움직이도록 하는 함수 변수 몇가지를 더 선언
window.addEventListener("mousewheel", e => {
	e.preventDefault();
	//활성화된 버튼의 순서값을 구함 
	let active = ul.querySelector("li.on");
	let active_index = lis_arr.indexOf(active);


	if (e.deltaY < 0) { //-100 
		console.log("마우스휠을 올렸습니다");
		if (active_index == 0) return;
		moveScroll(active_index - 1)
	} else { //100
		console.log("마우스휠을 내렸습니다");

		if (active_index == 3) return;
		moveScroll(active_index + 1);

	}
}, { passive: false })

//7 리사이즈, 재이벤트방지는 안해도되지만 굳이하자면
//브라우저가 리사이즈 되었을 때 
window.addEventListener("resize", () => {
	setPos();

	/*
	리사이즈되었을 때 활성화된 섹션과 버튼이 매칭이 안되고 있다 
	li.on이 버튼을 찾아서 순서값을 구하기 
	문서 scrollY값을 posArr[활성화된순번]
	*/

	const active = ul.querySelector("li.on");
	const active_index = lis_arr.indexOf(active);

	window.scroll(0, posArr[active_index]);
});

lis.forEach((li, index) => {
	li.addEventListener("click", e => {

		if (enableClick) {
			moveScroll(index);

		}


	})
})



//3 밑의 활성화 함수를 지우고 이 안의 코드를 활성화 함수로 만든다

function activation() {
	let scroll = window.scrollY || window.pageYOffset;
	sections.forEach((el, index) => {
		if (scroll >= posArr[index] + base) {

			for (let el of lis) {
				el.classList.remove('on');
			}
			lis[index].classList.add('on');

			for (let el of sections) {
				el.classList.remove('on');
			}
			sections[index].classList.add('on');
		}
	});
}

window.addEventListener('scroll', () => {
	//4 활성화 함수로 만든 자리에 함수호출을 해서 스크롤시 이동하도록 한다
	let scroll = window.scrollY || window.pageYOffset;
	activation();
	// h2.style.left = `${scroll - posArr[2]}px`;
	// h1.style.transform = `translateX(${scroll - posArr[2] + 200}px)`;
	// let scroll = window.scrollY || window.pageYOffset;
	// sections.forEach((el, index) => {
	// 	if (scroll >= posArr[index] + base) {

	// 		for (let el of lis) {
	// 			el.classList.remove('on');
	// 		}
	// 		lis[index].classList.add('on');

	// 		for (let el of sections) {
	// 			el.classList.remove('on');
	// 		}
	// 		sections[index].classList.add('on');
	// 	}
	// });
});
//1 이동하는 함수만들기
//반복문 안의 anime를 이용한 코드를 빼서 함수로 만든다
//이때 posArr에 index가 필요하므로 매개변수에는 index가 들어간다
function moveScroll(index) {



	window.scrollTo({ left: 0, top: posArr[index], behavior: "smooth" });


}

