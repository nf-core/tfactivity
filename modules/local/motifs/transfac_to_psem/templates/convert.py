#!/usr/bin/env python3

import numpy as np

transfac_path = "$transfac"
pseudocount = 1
A = 0
C = 1
G = 2
T = 3
base_order = [A, C, G, T]

lamda = 0.7
gc_content = 0.43
at_content = 1 - gc_content

slope = 0.584
intercept = -5.66

def write_pwm(f, matrix, name, ma_id):
    matrix = matrix + pseudocount
    matrix = matrix / matrix.sum(axis=1, keepdims=True)

    maxGC = np.maximum(matrix[:, G], matrix[:, C])
    maxAT = np.maximum(matrix[:, A], matrix[:, T])

    pwm = np.zeros_like(matrix)

    for i, active, active_content, other, other_content in zip([A, C, G, T], 
                                            [maxAT, maxGC, maxGC, maxAT], 
                                            [at_content, gc_content, gc_content, at_content],
                                            [maxGC, maxAT, maxAT, maxGC], 
                                            [gc_content, at_content, at_content, gc_content]):
        pwm[:, i] = np.where(active<other,
                    np.log((other / other_content) * (active_content / matrix[:, i])) / lamda,
                    np.log(active / matrix[:, i]) / lamda
                )
    
    lnR0 = len(matrix) * slope + intercept

    decimals = 6
    f.write(f">{ma_id}\\t{name}\\tlnR0: {(round(lnR0, decimals))}\\n")
    for row in pwm:
        f.write("\\t".join([f"{round(x, decimals)}" for x in row]) + "\\n")


with open(transfac_path, 'r') as f_in, open("${meta.id}.psem", "w") as f_out:
    cur_id, cur_name, cur_matrix = None, None, []
    for line in f_in:
        splitted = line.strip().split()
        prefix = splitted[0]

        if prefix in ["//"]: continue
        elif prefix == "P0":
            if splitted[A+1] != "A" or splitted[C+1] != "C" or splitted[G+1] != "G" or splitted[T+1] != "T":
                raise ValueError("Invalid transfac file")
        elif prefix == "ID":
            cur_id = splitted[1]
        elif prefix == "NA":
            cur_name = splitted[1]
        elif prefix.isnumeric():
            cur_matrix.append([int(splitted[i+1]) for i in base_order])
        elif prefix == "XX":
            if not cur_id or not cur_name or not cur_matrix:
                raise ValueError("Invalid transfac file")
            matrix = np.array(cur_matrix)
            write_pwm(f_out, matrix, cur_name, cur_id)
            cur_id, cur_name, cur_matrix = None, None, []
