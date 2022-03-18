// function fun1(fun) {
//     console.log("yup", fun())
// }

// fun1(() => { const x = 100; })

// import c2 from "./rough2"


// c11 = new c1()
// c11.fun1()
// console.log(this)

window1 = {
    x: "x in window obj",
    onClick1: () => null
}

// window1.onclick1 = () => { console.log("tinku") }

class c1 {
    constructor(x) {
        this.x = x;
        this.fun1 = this.fun1.bind(this)
    }
    fun1() {
        console.log("in fun1()");
        console.log(this.x)
    }
    fun2() {
        window1.onClick1 = this.fun1
        console.log("this is a method")
    }
}
c11 = new c1("c1")
c11.fun2()

function fun3() {
    console.log("this is a fucntion")
}

window1.onClick1()