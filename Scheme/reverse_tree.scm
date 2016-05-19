#lang r5rs

(define (reverse-tree s)
    ;; giving problem with an atom
  (if (not (list? s))
    (reverse-tree s)
    (reverse (map reverse s))))
