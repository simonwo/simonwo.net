---
title: The Fibonacci sequence in logarithmic time
category: technical
excerpt: A general technique for solving linear recurrence sequences, even in modular arithmetic.
featured: yes
---
{% include mathjax.html %}

The Fibonacci sequence is a well known mathematical sequence where each element is the sum of the two previous elements, and coding a function to generate an arbitrary element is still a common interview question for junior programmers. It does have a few practical uses, but it is just one example of _linear recurrence sequences_ which are widely used in random number generation.

There are trivial ways to code Fibonacci (and linear recurrence sequences) to run in linear time. It is however uncommonly known that there are also techniques using matrix transformations whose running time is sub-linear and memory usage is constant. These same methods also allow the sequence to be taken in modular arithmetic, which is critical for RNGs. This article is intended as a guide to using this technique.

### Fibonacci as a matrix transform

The key to this method lies in the ability to express our linear recurrence sequence (in this case Fibonacci) as a matrix transformation. The basic relation that defines the sequence is $$F_n = F_{n-1} + F_{n-2}$$. How can we express this as a matrix?

Well, we can make a start by just writing down that definition in matrix syntax.

$$
\begin{bmatrix}F_n\end{bmatrix} = \begin{bmatrix}1 & 1\end{bmatrix} \begin{bmatrix}F_{n-1} \\ F_{n-2}\end{bmatrix}
$$

If you carry out that transformation you’ll end up at the correct result for $$F_n$$, but this is not particularly helpful because your output matrix has different dimensions to your input matrix. This means you can’t apply the transformation more than once.

If you look at the column on the right-hand side, you see that the top element is the item in the sequence after the bottom element. So, in order to apply the transformation again, you’d need to end up with another pair of elements where the bottom is the element that appears before the top. We can do exactly that quite easily.

$$
\begin{bmatrix}F_n \\ F_{n-1}\end{bmatrix} = \begin{bmatrix}1 & 1 \\ 1 & 0\end{bmatrix} \begin{bmatrix}F_{n-1} \\ F_{n-2}\end{bmatrix}
$$

Now we’ve got a transformation matrix that can be applied multiple times. We can use this to express any element in the sequence as just a repeated transformation of an initial vector.

$$
\mathbf{F_n} = \begin{bmatrix}1 & 1 \\ 1 & 0\end{bmatrix}^n \begin{bmatrix}1 \\ 1\end{bmatrix} = \mathbf{A}^n\mathbf{F_0}
$$

### Cutting the time complexity

So far, calculating the $$n$$th element of the sequence would still be a linear operation, because you’d have to do $$n$$ matrix multiplications to calculate the final transformation matrix. However, we can make the algorithm logarithmic by simply squaring successively smaller matrices (a classic divide-and-conquer algorithm).

$$
\mathbf{A}^n = \begin{cases} (\mathbf{A}^{n/2})^2 & \text{if }n\text{ is even} \\ \mathbf{A}\mathbf{A}^{n-1} & \text{if }n\text{ is odd} \\\end{cases}
$$

To convince you that this is logarithmic, here is a specific case.

$$
\mathbf{A}^{16} = (\mathbf{A}^8)^2 = ((\mathbf{A}^4)^2)^2 = (((\mathbf{A}^2)^2)^2)^2
$$

Each squaring cuts the size of $$n$$ by half, so we end up with classic logarithmic time complexity. Note that $$\ln 16 = 4$$, which is the number of matrix multiplications required. Also note that we haven’t used any specific matrix $$\mathbf{A}$$ here – this is a general result.

### Adding in modular arithmetic

Using this technique also makes it possible to efficiently (in both time and memory) compute elements of a recurrence sequence in modulo arithmetic, which is useful in formulating random number generators. Note that here we mean a sequence where _every_ element of the sequence is taken moudlo $$m$$, not just the final result. For Fibonacci, our goal is generate the sequence where each element is subject to the modulo.

$$
F_n \bmod m = (F_{n-1} \bmod m + F_{n-2} \bmod m) \bmod m
$$

This translates to the following general matrix formulation.

$$
\mathbf{F_n} \bmod m = (\mathbf{A}^n \bmod m)\mathbf{F_0} \bmod m
$$

So, you calculate the transformation matrix modulo $$\mathbf{m}$$ and then also take the modulo of the result. To calculate the transformation matrix, you use the same algorithm as before but additionally take the modulo of the matrix after every multiplication.

$$
\mathbf{A}^n {\color{red}\bmod m} = \begin{cases} (\mathbf{A}^{n/2} {\color{red}\bmod m})^2 {\color{red}\bmod m} & \text{if }n\text{ is even} \\ \mathbf{A}(\mathbf{A}^{n-1}{\color{red}\bmod m}){\color{red}\bmod m} & \text{if }n\text{ is odd} \\\end{cases}
$$

To take a modulo of a matrix, you just take the modulo of all of its elements individually.

To illustrate how to code this, here is some example [CHICKEN Scheme](http://call-cc.org/) code for the specific case of Fibonacci.

```
(use chicken)
(use numbers) ; for remainder
(use linear-algebra) ; for matrix

; | 0, 1 |
; | 1, 1 |
(define fibonacci-matrix
  (vector (vector 0 1)
          (vector 1 1)))

; | 0 |
; | 1 |
(define fibonacci-initial
  (vector (vector 0) (vector 1)))

; Takes the remainder of a matrix
; This is just all the elements mod p
(define (matrix-remainder a p)
  (map-matrix (lambda (x) (remainder x p)) a))

; Calculates the matrix a to the power n, mod p
(define (matrix-power-remainder a n p)
  (if (eq? n 1)
    a
    (matrix-remainder
      (if (even? n)
        (let ((n-half (matrix-power-remainder a (/ n 2) p)))
         (m* n-half n-half))
        (m* a (matrix-power-remainder a (- n 1) p)))
      p)))

; Gets the n-th Fibonacci mod p number
(define (fibonacci-element-remainder n p)
  (remainder
    (matrix-ref
      (m*
       (matrix-power-remainder fibonacci-matrix n p)
       fibonacci-initial)
      0 0)
    p))
```

#### References

*   [“Linear Recurrences Modulo m”, Pierre L’Ecuyer](https://web.archive.org/web/20150305035935/http://sfb649.wiwi.hu-berlin.de/fedc_homepage/xplore/ebooks/html/csa/node17.html)
*   [“Building up the recurrence matrix to compute recurrences in O(logN) time”, Bruno Oliveira, CodeChef.com](https://discuss.codechef.com/questions/2335/building-up-the-recurrence-matrix-to-compute-recurrences-in-ologn-time)
