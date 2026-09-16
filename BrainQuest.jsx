import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Star, Trophy, Flame, Lock, Check, X, Home, Users, Sparkles,
  ChevronRight, ArrowLeft, Gem, Rocket, Crown, Clock, Target, Gift, RotateCcw
} from "lucide-react";

/* ============================== QUESTION BANK ============================== */

const WORLDS = [
  {
    id: "numberKingdom",
    name: "Number Kingdom",
    emoji: "🏰",
    color: "#FF9F45",
    category: "Numerical Ability",
    blurb: "Number patterns, place value & number puzzles",
    thinksheets: [
      {
        id: "nk1",
        title: "Number Detectives",
        difficulty: "Easy",
        skill: "Number Patterns",
        questions: [
          { prompt: "What comes next in the pattern?", visual: "5, 8, 11, 14, ?", options: ["15", "16", "17", "20"], correct: 2, explanation: "The numbers go up by 3 each time: 5, 8, 11, 14. So the next number is 14 + 3 = 17.", takeaway: "Find the gap between numbers to spot the pattern.", skill: "Number Patterns" },
          { prompt: "Which number is greater?", visual: "47   or   74", options: ["47", "74", "They are equal", "Cannot tell"], correct: 1, explanation: "74 has a 7 in the tens place, but 47 only has a 4 in the tens place. More tens means a bigger number, so 74 is greater.", takeaway: "Compare the tens digit first when two numbers have the same number of digits.", skill: "Number Comparison" },
          { prompt: "Which of these numbers is odd?", visual: "24, 36, 51, 88", options: ["24", "36", "51", "88"], correct: 2, explanation: "A number is odd if it cannot be split into two equal groups. 51 ends in 1, and numbers ending in 1, 3, 5, 7, or 9 are always odd.", takeaway: "Check the last digit to know if a number is odd or even.", skill: "Odd & Even Numbers" },
          { prompt: "What number comes just before 60?", visual: null, options: ["59", "61", "50", "69"], correct: 0, explanation: "\"Just before\" means one less. One less than 60 is 59.", takeaway: "Before means subtract 1, after means add 1.", skill: "Before / After / Between" },
          { prompt: "Skip count by 5s. What is missing?", visual: "5, 10, 15, ?, 25", options: ["18", "20", "22", "24"], correct: 1, explanation: "When you skip count by 5s, each number is 5 more than the last: 15 + 5 = 20.", takeaway: "Skip counting means adding the same number every time.", skill: "Skip Counting" },
          { prompt: "What is the value of the digit 6 in the number 68?", visual: null, options: ["6", "60", "8", "68"], correct: 1, explanation: "The 6 is in the tens place, so it stands for 6 tens, which is 60.", takeaway: "The position of a digit tells you its real value, not just the digit itself.", skill: "Place Value" },
        ],
      },
      {
        id: "nk2",
        title: "Number Ninjas",
        difficulty: "Medium",
        skill: "Number Puzzles",
        questions: [
          { prompt: "Find the missing number.", visual: "8 + ? = 15", options: ["6", "7", "8", "9"], correct: 1, explanation: "To find the missing number, take away 8 from 15: 15 − 8 = 7. Check: 8 + 7 = 15. ✓", takeaway: "You can use subtraction to check an addition puzzle.", skill: "Missing Numbers" },
          { prompt: "What comes next in this pattern?", visual: "40, 36, 32, ?, 24", options: ["26", "27", "28", "30"], correct: 2, explanation: "This pattern goes down by 4 each time: 40, 36, 32... so the next number is 32 − 4 = 28.", takeaway: "Patterns can count down too — find out how much is being subtracted each time.", skill: "Number Sequences" },
          { prompt: "Which number is between 34 and 38?", visual: null, options: ["30", "33", "36", "40"], correct: 2, explanation: "36 sits right in the middle of 34 and 38, so it is the only option between them.", takeaway: "\"Between\" means bigger than one number and smaller than the other.", skill: "Before / After / Between" },
          { prompt: "Rahul has 29 marbles and gets 31 more. About how many marbles does he have now?", visual: "29 + 31 ≈ ?", options: ["40", "50", "60", "70"], correct: 2, explanation: "29 is close to 30, and 31 is close to 30. 30 + 30 = 60, so the exact answer, 60, matches our estimate.", takeaway: "Rounding numbers first makes it easy to estimate an answer quickly.", skill: "Estimation" },
          { prompt: "I am a 2-digit number. My tens digit is 3 and my ones digit is 5. What number am I?", visual: null, options: ["53", "35", "58", "38"], correct: 1, explanation: "The tens digit comes first, so 3 tens and 5 ones makes 35.", takeaway: "Read a number puzzle clue by clue: tens digit first, then ones digit.", skill: "Number Puzzles" },
          { prompt: "What comes next in this doubling pattern?", visual: "2, 4, 8, 16, ?", options: ["18", "24", "30", "32"], correct: 3, explanation: "Each number is double the one before it: 2×2=4, 4×2=8, 8×2=16, so 16×2=32.", takeaway: "Some patterns multiply instead of adding — always check both!", skill: "Number Patterns" },
        ],
      },
    ],
  },
  {
    id: "patternPlanet",
    name: "Pattern Planet",
    emoji: "🪐",
    color: "#4EA8DE",
    category: "Patterns & Operations",
    blurb: "Shape patterns, missing operators & puzzles",
    thinksheets: [
      {
        id: "pp1",
        title: "Pattern Explorers",
        difficulty: "Easy+",
        skill: "Visual Patterns",
        questions: [
          { prompt: "What comes next in the pattern?", visual: "🔴🔵🔴🔵🔴 ?", options: ["🔴", "🔵", "🟢", "🟡"], correct: 1, explanation: "The pattern swaps between red and blue. Since the last shape shown was red, the next one must be blue.", takeaway: "AB patterns repeat two things over and over — look for the swap.", skill: "Visual Patterns" },
          { prompt: "What comes next in the pattern?", visual: "△○△○△ ?", options: ["△", "○", "▢", "☆"], correct: 1, explanation: "This is a repeating triangle-circle pattern. After a triangle comes a circle, every time.", takeaway: "Say the pattern out loud — it helps you hear what repeats.", skill: "Visual Patterns" },
          { prompt: "Find the missing number using the rule.", visual: "3, 6, 9, 12, ?", options: ["13", "14", "15", "16"], correct: 2, explanation: "Each number is 3 more than the one before: 12 + 3 = 15.", takeaway: "Once you find the rule, apply it one more time to get the next number.", skill: "Find the Rule" },
          { prompt: "In this row, which shape doesn't belong?", visual: "🔺🔺🔵🔺🔺", options: ["1st 🔺", "3rd 🔵", "4th 🔺", "All belong"], correct: 1, explanation: "Every shape in the row is a triangle except the 3rd one, which is a circle. It breaks the pattern.", takeaway: "\"Which one doesn't belong\" puzzles want you to spot the shape that's different.", skill: "Odd One Out" },
          { prompt: "A triangle has 3 sides. How many sides do 4 triangles have altogether?", visual: "🔺🔺🔺🔺", options: ["9", "10", "12", "16"], correct: 2, explanation: "Each triangle has 3 sides. 4 triangles: 3 + 3 + 3 + 3 = 12 sides.", takeaway: "Repeated addition is the same as counting groups of the same size.", skill: "Skip Counting" },
          { prompt: "What two numbers come next?", visual: "1, 1, 2, 2, 3, 3, ?, ?", options: ["4, 4", "4, 5", "3, 4", "5, 5"], correct: 0, explanation: "Every number appears twice in a row, going up by one each pair: 1,1, 2,2, 3,3, so next comes 4,4.", takeaway: "Some patterns repeat each number before moving to the next one.", skill: "Number Patterns" },
        ],
      },
      {
        id: "pp2",
        title: "Operation Station",
        difficulty: "Medium+",
        skill: "Missing Operators",
        questions: [
          { prompt: "Which sign is missing?", visual: "12  ?  4  =  3", options: ["+", "−", "×", "÷"], correct: 3, explanation: "12 divided into groups of 4 makes 3 groups: 12 ÷ 4 = 3.", takeaway: "When a bigger number splits into a smaller answer, try division.", skill: "Missing Operator" },
          { prompt: "Which sign is missing?", visual: "6  ?  5  =  30", options: ["+", "−", "×", "÷"], correct: 2, explanation: "6 groups of 5 make 30: 6 × 5 = 30. Addition or subtraction couldn't reach 30 from 6 and 5.", takeaway: "If the answer is much bigger than both numbers, think multiplication.", skill: "Missing Operator" },
          { prompt: "Meera had 10 stickers. She gave 3 to a friend and then got 5 more. How many stickers does she have now?", visual: "10 − 3 + 5 = ?", options: ["10", "11", "12", "13"], correct: 2, explanation: "First 10 − 3 = 7. Then 7 + 5 = 12 stickers.", takeaway: "Solve two-step problems one step at a time, in order.", skill: "Mixed Operations" },
          { prompt: "Find the missing number.", visual: "9 − ? = 4", options: ["4", "5", "13", "9"], correct: 1, explanation: "9 minus what equals 4? 9 − 5 = 4. You can check with addition: 4 + 5 = 9.", takeaway: "Turn a missing-number subtraction into an addition check.", skill: "Missing Numbers" },
          { prompt: "There are 4 bags with 3 apples in each bag. How many apples are there in total?", visual: "4 × 3 = ?", options: ["7", "9", "12", "15"], correct: 2, explanation: "4 groups of 3: 3 + 3 + 3 + 3 = 12, which is the same as 4 × 3 = 12.", takeaway: "Multiplication is a fast way to add equal groups.", skill: "Multiplication Basics" },
          { prompt: "12 candies are shared equally among 3 children. How many candies does each child get?", visual: "12 ÷ 3 = ?", options: ["3", "4", "6", "9"], correct: 1, explanation: "Sharing 12 candies into 3 equal groups gives 4 candies in each group: 12 ÷ 3 = 4.", takeaway: "Division means splitting a total into equal groups.", skill: "Division Basics" },
        ],
      },
    ],
  },
  {
    id: "logicLand",
    name: "Logic Land",
    emoji: "🧩",
    color: "#9B5DE5",
    category: "Logical Reasoning",
    blurb: "Odd one out, coding-decoding & deduction",
    thinksheets: [
      {
        id: "ll1",
        title: "Puzzle Path",
        difficulty: "Easy",
        skill: "Classification",
        questions: [
          { prompt: "Which one doesn't belong?", visual: "🍎 🍌 🥕 🥭", options: ["Apple 🍎", "Banana 🍌", "Carrot 🥕", "Mango 🥭"], correct: 2, explanation: "Apple, banana, and mango are all fruits. A carrot is a vegetable, so it doesn't belong with the rest.", takeaway: "To find the odd one out, first figure out what the others have in common.", skill: "Odd One Out" },
          { prompt: "Cat is to Kitten as Dog is to ?", visual: null, options: ["Puppy", "Cub", "Calf", "Chick"], correct: 0, explanation: "A kitten is a baby cat. In the same way, a puppy is a baby dog.", takeaway: "An analogy asks you to match the same kind of relationship.", skill: "Analogies" },
          { prompt: "Circle, Square, and Triangle all belong to which group?", visual: "⭕ ⬛ 🔺", options: ["Shapes", "Animals", "Fruits", "Numbers"], correct: 0, explanation: "A circle, square, and triangle are all examples of shapes.", takeaway: "Classifying means finding the group that everything fits into.", skill: "Classification" },
          { prompt: "Which number doesn't belong?", visual: "2, 4, 6, 7, 8", options: ["2", "4", "6", "7"], correct: 3, explanation: "2, 4, 6, and 8 are all even numbers. 7 is odd, so it breaks the pattern.", takeaway: "Look for what's common (like even numbers) before spotting the exception.", skill: "Odd One Out" },
          { prompt: "If Monday comes right after Sunday, what comes right after Monday?", visual: null, options: ["Wednesday", "Tuesday", "Sunday", "Friday"], correct: 1, explanation: "The days of the week go in order: Sunday, Monday, Tuesday... so Tuesday comes right after Monday.", takeaway: "Knowing the order of days helps you answer \"comes after\" questions.", skill: "Sequencing" },
          { prompt: "All cats have whiskers. Whiskers is a cat. Does Whiskers have whiskers?", visual: null, options: ["Yes", "No", "Maybe", "Cannot tell"], correct: 0, explanation: "Since every cat has whiskers, and Whiskers is a cat, Whiskers must have whiskers too.", takeaway: "If a rule is true for a whole group, it's true for every member of that group.", skill: "Logical Deduction" },
        ],
      },
      {
        id: "ll2",
        title: "Code Crackers",
        difficulty: "Medium",
        skill: "Coding-Decoding",
        questions: [
          { prompt: "If A = 1, B = 2, C = 3, D = 4, E = 5, what is B + D?", visual: "B + D = ?", options: ["5", "6", "7", "9"], correct: 1, explanation: "B stands for 2 and D stands for 4. 2 + 4 = 6.", takeaway: "Swap each letter for its number first, then solve like a normal sum.", skill: "Coding-Decoding" },
          { prompt: "In a code, CAT is written as DBU (every letter moves forward by 1). How is DOG written in the same code?", visual: "C→D, A→B, T→U ... D→? O→? G→?", options: ["EPH", "EQH", "DPG", "FPI"], correct: 0, explanation: "Each letter shifts forward by one: D→E, O→P, G→H. So DOG becomes EPH.", takeaway: "Find the rule from the example first, then use the same rule on the new word.", skill: "Coding-Decoding" },
          { prompt: "Riya is taller than Sam. Sam is taller than Tom. Who is the shortest?", visual: null, options: ["Riya", "Sam", "Tom", "Cannot tell"], correct: 2, explanation: "Riya > Sam > Tom in height, so Tom is the shortest of the three.", takeaway: "Line up clues in order to compare things you can't see directly.", skill: "Logical Deduction" },
          { prompt: "Which of these numbers is the smallest?", visual: "15, 8, 21, 3", options: ["15", "8", "21", "3"], correct: 3, explanation: "Comparing all four numbers, 3 is smaller than 8, 15, and 21.", takeaway: "When ordering numbers, compare them two at a time to find the smallest.", skill: "Number Comparison" },
          { prompt: "If it rains, the ground gets wet. The ground is wet. Did it definitely rain?", visual: null, options: ["Yes", "No", "Maybe", "Cannot be sure"], correct: 3, explanation: "Rain isn't the only thing that makes the ground wet — a hose or spilled water could too. So we cannot be sure it rained.", takeaway: "Just because an effect happened doesn't always tell you the exact cause.", skill: "Cause and Effect" },
          { prompt: "In a race, Priya finished before Kabir, and Kabir finished before Leo. Who finished first?", visual: null, options: ["Priya", "Kabir", "Leo", "Cannot tell"], correct: 0, explanation: "Priya before Kabir, Kabir before Leo, so the order is Priya, then Kabir, then Leo. Priya finished first.", takeaway: "Draw the order out step by step when comparing more than two things.", skill: "Logical Ordering" },
        ],
      },
    ],
  },
  {
    id: "shapeCity",
    name: "Shape City",
    emoji: "🏙️",
    color: "#2EC4B6",
    category: "Visual Thinking & Geometry",
    blurb: "Shapes, symmetry, mirrors & rotations",
    thinksheets: [
      {
        id: "sc1",
        title: "Shape Safari",
        difficulty: "Easy+",
        skill: "Shape Recognition",
        questions: [
          { prompt: "How many sides does a triangle have?", visual: "🔺", options: ["2", "3", "4", "5"], correct: 1, explanation: "A triangle always has exactly 3 straight sides — that's what makes it a triangle.", takeaway: "The name of a shape often tells you how many sides it has (\"tri\" means three).", skill: "Shape Recognition" },
          { prompt: "Which shape has 4 equal sides?", visual: null, options: ["Square", "Rectangle", "Triangle", "Circle"], correct: 0, explanation: "A square has 4 sides that are all the same length. A rectangle has 4 sides too, but they aren't all equal.", takeaway: "Squares and rectangles both have 4 sides, but only a square has equal sides.", skill: "Shape Recognition" },
          { prompt: "How many triangles are in this row?", visual: "🔺 ⭕ 🔺 ⭕ 🔺", options: ["2", "3", "4", "5"], correct: 1, explanation: "Counting only the triangle shapes 🔺 in the row, there are 3 of them.", takeaway: "Count one shape type at a time so you don't mix them up.", skill: "Counting Shapes" },
          { prompt: "Which letter has a line of symmetry?", visual: "A   F   G   R", options: ["A", "F", "G", "R"], correct: 0, explanation: "If you fold the letter A down the middle, both halves match perfectly — that's a line of symmetry.", takeaway: "A shape is symmetric if you can fold it in half and both sides match exactly.", skill: "Symmetry" },
          { prompt: "Which of these is a 3D shape?", visual: null, options: ["Square", "Cube", "Triangle", "Circle"], correct: 1, explanation: "A cube has length, width, and height, so it is a 3D (solid) shape. The others are flat, 2D shapes.", takeaway: "3D shapes can be picked up and held; 2D shapes are flat drawings.", skill: "3D Objects" },
          { prompt: "A square is cut corner-to-corner into 2 equal parts. What shape are the parts?", visual: "◱", options: ["1 triangle", "2 triangles", "3 triangles", "4 triangles"], correct: 1, explanation: "Cutting a square along one diagonal line creates exactly 2 triangles.", takeaway: "A diagonal line always splits a square into two matching triangles.", skill: "Shapes Within Shapes" },
        ],
      },
      {
        id: "sc2",
        title: "Mirror Maze",
        difficulty: "Medium+",
        skill: "Mirror Images",
        questions: [
          { prompt: "Which digit looks the same when reflected left-to-right in a mirror?", visual: "2   3   8   6", options: ["2", "3", "8", "6"], correct: 2, explanation: "The digit 8 is made of two matching loops, so it looks the same in a mirror. 2, 3, and 6 all look different when flipped.", takeaway: "A shape looks the same in a mirror only if both halves are already identical.", skill: "Mirror Images" },
          { prompt: "If you rotate the letter 'p' by 180°, which letter does it look like?", visual: "p → ?", options: ["b", "d", "q", "p"], correct: 1, explanation: "Turning 'p' upside down flips both the loop and the stem, turning it into 'd'.", takeaway: "Rotating 180° flips a shape both up-down and left-right at once.", skill: "Rotations" },
          { prompt: "How many triangles (▲) are in this row?", visual: "▲ ■ ▲ ● ■ ▲", options: ["2", "3", "4", "5"], correct: 1, explanation: "Scanning the row, ▲ appears 3 times, mixed in with squares and a circle.", takeaway: "When shapes are mixed together, go slowly and count just one kind at a time.", skill: "Embedded Figures" },
          { prompt: "What comes next in the pattern?", visual: "⬛ ⬜ ⬛ ⬜ ⬛ ?", options: ["⬛", "⬜", "🔺", "⭐"], correct: 1, explanation: "The pattern alternates black and white squares. After a black square comes a white one.", takeaway: "Alternating patterns swap between exactly two things, over and over.", skill: "Visual Patterns" },
          { prompt: "A ball is inside a box, and the box is on a table. Where is the ball relative to the table?", visual: null, options: ["Under the table", "On the table", "Beside the table", "Cannot tell"], correct: 1, explanation: "The box sits on the table, and the ball is inside the box, so the ball is also on the table (inside the box).", takeaway: "Picture the whole scene in your head before choosing where something is.", skill: "Spatial Relationships" },
          { prompt: "How many lines of symmetry does a square have?", visual: "⬜", options: ["1", "2", "4", "8"], correct: 2, explanation: "A square can be folded in half 4 different ways (straight down the middle twice, and both diagonals) and still match perfectly.", takeaway: "Some shapes have more than one line of symmetry — try folding in different directions.", skill: "Symmetry" },
        ],
      },
    ],
  },
  {
    id: "brainGalaxy",
    name: "Brain Galaxy",
    emoji: "🌌",
    color: "#F72585",
    category: "Memory & Life Skills",
    blurb: "Memory games, clocks, calendars & money",
    thinksheets: [
      {
        id: "bg1",
        title: "Memory Mission",
        difficulty: "Easy",
        skill: "Memory & Concentration",
        questions: [
          { prompt: "Look at this list. Which fruit is second in the list?", visual: "🍎 🍌 🍇 🍊", options: ["Apple 🍎", "Banana 🍌", "Grapes 🍇", "Orange 🍊"], correct: 1, explanation: "Counting from the left, Apple is 1st and Banana is 2nd in the list.", takeaway: "When a question asks for a position, count carefully from the start.", skill: "Sequence Memory" },
          { prompt: "Remember these numbers. What is the middle number?", visual: "4   7   2", options: ["4", "7", "2", "9"], correct: 1, explanation: "In the list 4, 7, 2 — the number 7 sits in the middle position.", takeaway: "The \"middle\" is the one with an equal number of items on both sides.", skill: "Number Memory" },
          { prompt: "Which color changed between Row A and Row B?", visual: "Row A: 🔵🔴🟢     Row B: 🔵🟡🟢", options: ["Blue → stayed the same", "Red → Yellow", "Green → stayed the same", "Nothing changed"], correct: 1, explanation: "Comparing the two rows, the middle circle changed from red 🔴 to yellow 🟡. The first and last circles stayed the same.", takeaway: "Compare one position at a time to spot exactly what changed.", skill: "Find What Changed" },
          { prompt: "A → B → C → D → E. What letter comes 2 steps after B?", visual: null, options: ["C", "D", "E", "F"], correct: 1, explanation: "Starting at B, one step forward is C, and two steps forward is D.", takeaway: "Count steps one at a time along a sequence to avoid mistakes.", skill: "Sequence Memory" },
          { prompt: "How many times does the letter 'A' appear?", visual: "B A N A N A", options: ["1", "2", "3", "4"], correct: 2, explanation: "Going letter by letter: B, A, N, A, N, A — the letter A appears 3 times.", takeaway: "Point to each letter as you count so none get missed or counted twice.", skill: "Concentration" },
          { prompt: "Tom has a red ball, a blue car, and a green kite. Which toy is a vehicle?", visual: "⚽ 🚗 🪁", options: ["Red ball", "Blue car", "Green kite", "None of them"], correct: 1, explanation: "A car is a vehicle because it's used for moving people or things from place to place. A ball and a kite are not vehicles.", takeaway: "A vehicle is anything built to carry people or goods from one place to another.", skill: "Object Memory" },
        ],
      },
      {
        id: "bg2",
        title: "Time & Money Trek",
        difficulty: "Medium",
        skill: "Time & Money",
        questions: [
          { prompt: "A clock shows 3 o'clock. What number does the hour hand point to?", visual: "🕒 = 3:00", options: ["12", "3", "6", "9"], correct: 1, explanation: "At 3 o'clock exactly, the short hour hand points straight at the 3.", takeaway: "The short hand shows the hour; the long hand shows the minutes.", skill: "Reading Clocks" },
          { prompt: "Which day comes right after Friday?", visual: null, options: ["Thursday", "Saturday", "Sunday", "Monday"], correct: 1, explanation: "The order of days is ...Thursday, Friday, Saturday, Sunday... so Saturday comes right after Friday.", takeaway: "Practice saying the days of the week in order until it's automatic.", skill: "Days & Calendar" },
          { prompt: "You have 2 coins worth ₹5 each. How much money do you have?", visual: "🪙 + 🪙 = ?", options: ["₹5", "₹10", "₹15", "₹20"], correct: 1, explanation: "2 coins of ₹5 each: 5 + 5 = ₹10.", takeaway: "Counting money is just adding the same amount over and over.", skill: "Counting Money" },
          { prompt: "Which combination makes exactly ₹20?", visual: null, options: ["2 × ₹10", "4 × ₹10", "1 × ₹5", "2 × ₹5"], correct: 0, explanation: "2 coins of ₹10 each add up to 10 + 10 = ₹20 exactly.", takeaway: "Check each option by adding it up before choosing the answer.", skill: "Making Amounts" },
          { prompt: "Which is longer: a pencil or a school bus?", visual: "✏️  vs  🚌", options: ["A pencil", "A school bus", "They are the same", "Cannot tell"], correct: 1, explanation: "A school bus is many times longer than a small pencil.", takeaway: "Compare objects by picturing them side by side in your mind.", skill: "Measurement" },
          { prompt: "A movie starts at 4:00 and ends at 5:00. How long is the movie?", visual: "4:00 → 5:00", options: ["30 minutes", "1 hour", "2 hours", "1 day"], correct: 1, explanation: "From 4:00 to 5:00 is exactly one full hour.", takeaway: "To find duration, count how much time passes from start to end.", skill: "Time Duration" },
        ],
      },
    ],
  },
];

const OLYMPIAD_TEST = {
  id: "olympiadMini",
  title: "Olympiad Mini Mock",
  difficulty: "Olympiad Challenge",
  questions: [
    { prompt: "Ravi had some marbles. He gave 4 to his sister and now has 9 left. How many marbles did he have at first?", visual: "? − 4 = 9", options: ["5", "9", "13", "17"], correct: 2, explanation: "Work backwards: if 9 are left after giving away 4, he started with 9 + 4 = 13 marbles.", takeaway: "When a problem works backwards, undo the last step first using the opposite operation.", skill: "Multi-Step Reasoning" },
    { prompt: "Find the missing number. The gap grows by 2 more each time.", visual: "2, 5, 10, 17, ?  (gaps: +3, +5, +7, ...)", options: ["24", "25", "26", "28"], correct: 2, explanation: "The gaps are +3, +5, +7 — each gap is 2 more than the last. So the next gap is +9: 17 + 9 = 26.", takeaway: "When the pattern isn't in the numbers themselves, look at the pattern in the gaps.", skill: "Pattern Discovery" },
    { prompt: "In a row of children, Meena is 3rd from the left and 5th from the right. How many children are in the row?", visual: null, options: ["6", "7", "8", "9"], correct: 1, explanation: "Meena is counted once from each side, so: 3 + 5 − 1 = 7 children in total.", takeaway: "When someone is counted from both ends, subtract 1 so you don't count them twice.", skill: "Logical Puzzles" },
    { prompt: "A farmer has some cows and chickens. Together they have 10 heads. How many cows are there?", visual: null, options: ["4", "6", "Cannot be determined", "10"], correct: 2, explanation: "We only know the total number of heads (10), not how many are cows and how many are chickens — there are many possible answers, so it cannot be determined from this information alone.", takeaway: "Some problems are missing information on purpose — read carefully before assuming an answer.", skill: "Missing Information" },
    { prompt: "Stars appear in groups, growing by one each time a moon appears.", visual: "⭐⭐ 🌙 ⭐⭐⭐ 🌙 ⭐⭐⭐⭐ 🌙 ?", options: ["4 stars", "5 stars", "6 stars", "7 stars"], correct: 1, explanation: "The star groups grow by one each time: 2, 3, 4, so the next group has 5 stars.", takeaway: "Look past the symbols to the numbers hiding inside the pattern.", skill: "What Comes Next?" },
    { prompt: "Look at the numbers 12, 15, 18, and 21. Which statement is true?", visual: null, options: ["All are even", "All are multiples of 3", "All are odd", "All are multiples of 5"], correct: 1, explanation: "12 ÷ 3 = 4, 15 ÷ 3 = 5, 18 ÷ 3 = 6, and 21 ÷ 3 = 7 — every number divides evenly by 3, so all are multiples of 3.", takeaway: "Test a rule against every number in the list before deciding it's true.", skill: "Which Statement Is True?" },
    { prompt: "In how many ways can you make 10 by adding two single-digit numbers (1-9)?", visual: "1+9, 2+8, 3+7, 4+6, 5+5", options: ["4", "5", "6", "9"], correct: 1, explanation: "The pairs are 1+9, 2+8, 3+7, 4+6, and 5+5 — that's 5 different ways.", takeaway: "List out possibilities in order so you don't repeat or miss any.", skill: "How Many Ways?" },
    { prompt: "Simran buys a pencil for ₹8 and an eraser for ₹5. She pays with a ₹20 note. How much change does she get?", visual: "₹20 − (₹8 + ₹5) = ?", options: ["₹5", "₹6", "₹7", "₹8"], correct: 2, explanation: "The pencil and eraser together cost 8 + 5 = ₹13. Her change is 20 − 13 = ₹7.", takeaway: "Add up the total cost first, then subtract it from the money paid.", skill: "Multi-Step Reasoning" },
    { prompt: "Which is greater: the sum of 8 and 5, or the product of 3 and 4?", visual: "8 + 5   vs   3 × 4", options: ["The sum (13)", "The product (12)", "They are equal", "Cannot tell"], correct: 0, explanation: "8 + 5 = 13 and 3 × 4 = 12. Since 13 is more than 12, the sum is greater — even though multiplication can seem like the \"bigger\" operation.", takeaway: "Never guess which operation gives a bigger answer — always calculate both.", skill: "Careful Reading" },
    { prompt: "Four friends stand in a line. Aan is behind Bala. Bala is behind Chetan. Chetan is behind Dev. Who is at the very front?", visual: null, options: ["Aan", "Bala", "Chetan", "Dev"], correct: 3, explanation: "Ordering from the clues: Dev, then Chetan, then Bala, then Aan. Dev is at the very front.", takeaway: "Turn a chain of \"behind\" clues into one ordered line, one clue at a time.", skill: "Logical Ordering" },
  ],
};

// Original practice papers styled after each year's Olympiad patterns — not reproductions of any official test.
const PAST_PAPERS = [
  {
    id: "pp2025", year: 2025, title: "2025 Practice Paper", difficulty: "Olympiad Challenge",
    questions: [
      { prompt: "What comes next in the pattern?", visual: "2, 5, 14, 41, ?", options: ["100", "110", "122", "132"], correct: 2, explanation: "Each number is tripled and then 1 is subtracted: 2×3−1=5, 5×3−1=14, 14×3−1=41, so 41×3−1=122.", takeaway: "Test both multiplying and subtracting when a pattern grows very quickly.", skill: "Pattern Discovery" },
      { prompt: "A shopkeeper had ₹200. He earned ₹85 from sales, spent ₹40 on supplies, and gave ₹25 to charity. How much money does he have now?", visual: "200 + 85 − 40 − 25 = ?", options: ["₹215", "₹220", "₹225", "₹230"], correct: 1, explanation: "200+85=285, 285−40=245, 245−25=220.", takeaway: "Work through several steps of money left to right, one operation at a time.", skill: "Multi-Step Reasoning" },
      { prompt: "A garden has roses and tulips. Together they have 24 flowers. How many roses are there?", visual: null, options: ["8", "12", "16", "Cannot be determined"], correct: 3, explanation: "We only know the total (24), not how the flowers are split between roses and tulips — many combinations are possible.", takeaway: "Some problems are missing information on purpose — don't assume an even split.", skill: "Missing Information" },
      { prompt: "In a code, each letter shifts forward by 2 and then the whole word is reversed. How is 'CAB' written?", visual: "C→E, A→C, B→D, then reverse", options: ["DCE", "ECD", "DEC", "CED"], correct: 0, explanation: "Shifting forward by 2 gives ECD. Reversing ECD letter by letter gives DCE.", takeaway: "When a code has two rules, apply them one at a time, in order.", skill: "Coding-Decoding" },
      { prompt: "Look at 12, 18, 24, and 30. Which statement is true?", visual: null, options: ["All are multiples of only 2", "All are multiples of both 2 and 3", "All are multiples of 5", "All are prime numbers"], correct: 1, explanation: "Every number divides evenly by 2 and by 3 (e.g. 12÷3=4, 12÷2=6), so all are multiples of both.", takeaway: "A number can be a multiple of more than one number at the same time.", skill: "Which Statement Is True?" },
      { prompt: "How many squares of any size can you find in a 3×3 grid of small squares?", visual: "▦▦▦ / ▦▦▦ / ▦▦▦", options: ["9", "12", "14", "16"], correct: 2, explanation: "There are 9 tiny 1×1 squares, 4 medium 2×2 squares, and 1 big 3×3 square: 9+4+1=14.", takeaway: "Don't stop at counting the smallest squares — look for bigger squares hiding inside the grid too.", skill: "Spatial Reasoning" },
      { prompt: "In a race of four, Kabir finished first. Sam did not finish first. Sam finished right before Maya, and Maya finished right before Dev. Who finished 3rd?", visual: null, options: ["Sam", "Maya", "Dev", "Kabir"], correct: 1, explanation: "The order is Kabir, then Sam, then Maya, then Dev — so Maya finished 3rd.", takeaway: "Turn a chain of 'right before' clues into one ordered line, one clue at a time.", skill: "Logical Ordering" },
      { prompt: "Which is greater: the sum of 15 and 12, or the product of 5 and 6?", visual: "15 + 12   vs   5 × 6", options: ["The sum (27)", "The product (30)", "They are equal", "Cannot tell"], correct: 1, explanation: "15+12=27 and 5×6=30. Since 30 is more than 27, the product is greater this time.", takeaway: "Never guess which operation wins — calculate both and compare.", skill: "Careful Reading" },
    ],
  },
  {
    id: "pp2024", year: 2024, title: "2024 Practice Paper", difficulty: "Olympiad Challenge",
    questions: [
      { prompt: "What comes next in the pattern?", visual: "3, 7, 13, 21, 31, ?", options: ["39", "41", "43", "45"], correct: 2, explanation: "The gaps between numbers grow by 2 each time: +4, +6, +8, +10, so the next gap is +12: 31+12=43.", takeaway: "When the numbers themselves don't repeat, look at the pattern in the gaps between them.", skill: "Pattern Discovery" },
      { prompt: "All squares are rectangles. Some rectangles are red. Is it definitely true that every square is red?", visual: null, options: ["Yes", "No", "Sometimes", "Cannot tell"], correct: 1, explanation: "Being a rectangle doesn't guarantee being red — only some rectangles are red, so we can't say every square is red.", takeaway: "Belonging to a group doesn't mean you have every property some members of that group have.", skill: "Logical Deduction" },
      { prompt: "Priya spent ₹25 on a book and then had ₹40 left. How much money did she have at first?", visual: "? − 25 = 40", options: ["₹55", "₹60", "₹65", "₹70"], correct: 2, explanation: "Working backwards: if ₹40 is left after spending ₹25, she started with 40+25=₹65.", takeaway: "When a problem works backwards from the end, undo the last step with the opposite operation.", skill: "Multi-Step Reasoning" },
      { prompt: "Which of these numbers is NOT a prime number?", visual: "7, 9, 11, 13", options: ["7", "9", "11", "13"], correct: 1, explanation: "9 can be divided evenly by 3 (9=3×3), so it isn't prime. 7, 11, and 13 can only be divided evenly by 1 and themselves.", takeaway: "A prime number has exactly two factors: 1 and itself — check for a hidden third factor.", skill: "Number Theory" },
      { prompt: "In a code, words are written backwards. How is 'STAR' written in this code?", visual: "STAR → ?", options: ["RATS", "STRA", "RAST", "TARS"], correct: 0, explanation: "Reversing the letters of STAR (S-T-A-R) gives R-A-T-S, which spells RATS.", takeaway: "To reverse a word, read its letters from the last one to the first.", skill: "Coding-Decoding" },
      { prompt: "If you rotate the digit '6' by 180°, which digit does it look like?", visual: "6 → ?", options: ["6", "8", "9", "0"], correct: 2, explanation: "Turning a 6 upside down flips its loop and stem, turning it into a 9.", takeaway: "Rotating 180° flips a shape both up-down and left-right at the same time.", skill: "Rotations" },
      { prompt: "In how many ways can you make 12 by adding two different single-digit numbers (1-9)?", visual: "3+9, 4+8, 5+7", options: ["2", "3", "4", "5"], correct: 1, explanation: "The pairs of different digits that add to 12 are 3+9, 4+8, and 5+7 — that's 3 ways (6+6 doesn't count since the digits must be different).", takeaway: "List possibilities in order and watch for rules like 'different numbers only'.", skill: "How Many Ways?" },
      { prompt: "In a queue, Arjun is 5th from the front and 4th from the back. How many people are in the queue?", visual: null, options: ["7", "8", "9", "10"], correct: 1, explanation: "Arjun is counted once from each end, so: 5+4−1=8 people in total.", takeaway: "When someone is counted from both ends, subtract 1 so they aren't counted twice.", skill: "Logical Puzzles" },
    ],
  },
  {
    id: "pp2023", year: 2023, title: "2023 Practice Paper", difficulty: "Olympiad Challenge",
    questions: [
      { prompt: "What comes next in the pattern?", visual: "1, 1, 2, 3, 5, ?", options: ["6", "7", "8", "9"], correct: 2, explanation: "Each number is the sum of the two numbers before it: 2+3=5, so the next is 3+5=8.", takeaway: "Some patterns depend on more than just the one number before them.", skill: "Number Patterns" },
      { prompt: "What is 3 × (4 + 2)?", visual: "3 × (4 + 2) = ?", options: ["14", "18", "20", "24"], correct: 1, explanation: "Solve inside the brackets first: 4+2=6, then multiply: 3×6=18.", takeaway: "Always work out what's inside brackets before doing the operation outside them.", skill: "Order of Operations" },
      { prompt: "A pet shop has some cats and parrots. Together they have 30 legs. How many cats are there?", visual: null, options: ["6", "10", "15", "Cannot be determined"], correct: 3, explanation: "Cats have 4 legs and parrots have 2, and many combinations can add up to 30 legs — there isn't enough information to know exactly how many cats there are.", takeaway: "Watch for problems that give a total but leave out the details needed to split it.", skill: "Missing Information" },
      { prompt: "In a code, each letter shifts forward by 3 (A→D, B→E...). How is 'CAT' written in this code?", visual: "C→F, A→D, T→W", options: ["FDW", "FDV", "EDW", "FCW"], correct: 0, explanation: "Shifting each letter forward by 3: C→F, A→D, T→W, spelling FDW.", takeaway: "Apply the same shift to every letter, one at a time.", skill: "Coding-Decoding" },
      { prompt: "A toy costs ₹80. During a sale, ₹15 is taken off the price. Meena pays with a ₹100 note. How much change does she get?", visual: "100 − (80 − 15) = ?", options: ["₹25", "₹30", "₹35", "₹40"], correct: 2, explanation: "The sale price is 80−15=₹65. Her change is 100−65=₹35.", takeaway: "Find the new price after a discount before working out the change.", skill: "Multi-Step Reasoning" },
      { prompt: "How many triangles (▲) are in this row?", visual: "▲ ▲ ● ▲ ■ ▲ ▲", options: ["3", "4", "5", "6"], correct: 2, explanation: "Counting only the triangle shapes ▲ in the row gives 5 of them.", takeaway: "Go slowly and count just one shape type at a time when shapes are mixed together.", skill: "Embedded Figures" },
      { prompt: "Which combination makes exactly ₹35?", visual: null, options: ["1×₹20 + 1×₹10", "2×₹10 + 1×₹5", "3×₹10 + 1×₹5", "1×₹20 + 1×₹5"], correct: 2, explanation: "3 coins of ₹10 plus 1 coin of ₹5: 10+10+10+5=₹35 exactly.", takeaway: "Check each option by adding it up fully before picking the answer.", skill: "Making Amounts" },
      { prompt: "In a line of children, Tara is 4th from the left and 6th from the right. How many children are in the line?", visual: null, options: ["8", "9", "10", "11"], correct: 1, explanation: "Tara is counted once from each side, so: 4+6−1=9 children in total.", takeaway: "Subtract 1 whenever someone is counted from both ends of a line.", skill: "Logical Puzzles" },
    ],
  },
  {
    id: "pp2022", year: 2022, title: "2022 Practice Paper", difficulty: "Challenging",
    questions: [
      { prompt: "What comes next in the pattern?", visual: "5, 9, 15, 23, ?", options: ["31", "32", "33", "35"], correct: 2, explanation: "The gaps grow by 2 each time: +4, +6, +8, so the next gap is +10: 23+10=33.", takeaway: "When a pattern speeds up, check whether the gap itself is following its own pattern.", skill: "Pattern Discovery" },
      { prompt: "A shop had 45 balloons. It sold 18 in the morning and 12 in the afternoon, then received 20 more. How many balloons does it have now?", visual: "45 − 18 − 12 + 20 = ?", options: ["33", "35", "37", "40"], correct: 1, explanation: "45−18=27, 27−12=15, 15+20=35.", takeaway: "Handle a multi-step story problem one event at a time, in the order it happens.", skill: "Multi-Step Reasoning" },
      { prompt: "If A=1, B=2, C=3, and so on, what is the sum of the letters in 'CAB'?", visual: "C=3, A=1, B=2", options: ["5", "6", "7", "8"], correct: 1, explanation: "C is 3, A is 1, and B is 2. 3+1+2=6.", takeaway: "Swap each letter for its number first, then add them like a normal sum.", skill: "Coding-Decoding" },
      { prompt: "Look at 21, 24, 27, and 30. Which statement is NOT true?", visual: null, options: ["All are multiples of 3", "All are even", "All are greater than 20", "All are less than 31"], correct: 1, explanation: "21 and 27 are odd numbers, so \"all are even\" is false — even though the other three statements are true.", takeaway: "Test a statement against every number in the list; one exception makes it false.", skill: "Which Statement Is True?" },
      { prompt: "How many lines of symmetry does a rectangle (that is not a square) have?", visual: "▭", options: ["1", "2", "3", "4"], correct: 1, explanation: "A rectangle can be folded in half two ways — straight down the middle vertically and horizontally — and still match.", takeaway: "A rectangle has fewer lines of symmetry than a square because its sides aren't all equal.", skill: "Symmetry" },
      { prompt: "Estimate: 29 × 4 is closest to?", visual: "29 × 4 ≈ ?", options: ["100", "110", "120", "130"], correct: 2, explanation: "29 is close to 30, and 30×4=120, which is close to the exact answer.", takeaway: "Rounding one number to the nearest ten makes multiplication easy to estimate.", skill: "Estimation" },
      { prompt: "Neha is taller than Sam. Sam is taller than Ali. Ali is taller than Tom. Who is the 2nd tallest?", visual: null, options: ["Neha", "Sam", "Ali", "Tom"], correct: 1, explanation: "The order from tallest to shortest is Neha, Sam, Ali, Tom — so Sam is 2nd tallest.", takeaway: "Line up every clue in order before picking out a specific position.", skill: "Logical Ordering" },
      { prompt: "In how many ways can you make ₹50 using only ₹10 and ₹20 coins?", visual: "10a + 20b = 50", options: ["2", "3", "4", "5"], correct: 1, explanation: "The combinations are 5×₹10, 3×₹10 + 1×₹20, and 1×₹10 + 2×₹20 — that's 3 ways.", takeaway: "Try every number of the bigger coin first, then fill the rest with the smaller coin.", skill: "How Many Ways?" },
    ],
  },
  {
    id: "pp2021", year: 2021, title: "2021 Practice Paper", difficulty: "Challenging",
    questions: [
      { prompt: "What comes next in the pattern?", visual: "1, 4, 9, 16, ?", options: ["20", "24", "25", "30"], correct: 2, explanation: "These are square numbers: 1×1, 2×2, 3×3, 4×4, so the next is 5×5=25.", takeaway: "A number multiplied by itself is called a square number — a common hidden pattern.", skill: "Number Patterns" },
      { prompt: "All birds can lay eggs. A sparrow is a bird. Can a sparrow lay eggs?", visual: null, options: ["Yes", "No", "Maybe", "Cannot tell"], correct: 0, explanation: "Since every bird can lay eggs, and a sparrow is a bird, a sparrow can lay eggs too.", takeaway: "If a rule is true for a whole group, it's true for every member of it.", skill: "Logical Deduction" },
      { prompt: "I am a 2-digit number. My tens digit is 6 and my ones digit is 2. What number am I?", visual: null, options: ["26", "62", "68", "82"], correct: 1, explanation: "The tens digit comes first, so 6 tens and 2 ones makes 62.", takeaway: "Read number clues in order: tens digit first, then ones digit.", skill: "Number Puzzles" },
      { prompt: "Which shape doesn't belong?", visual: "⬛ ⬛ ⭕ ⬛", options: ["1st ⬛", "2nd ⬛", "3rd ⭕", "4th ⬛"], correct: 2, explanation: "Every shape in the row is a square except the 3rd one, which is a circle.", takeaway: "Find what most of the shapes have in common before spotting the exception.", skill: "Odd One Out" },
      { prompt: "What is 6 + 4 × 2?", visual: "6 + 4 × 2 = ?", options: ["20", "14", "16", "12"], correct: 1, explanation: "Multiply before you add: 4×2=8, then 6+8=14.", takeaway: "Multiplication and division happen before addition and subtraction.", skill: "Order of Operations" },
      { prompt: "Deepak buys 3 chocolates at ₹6 each. He pays with a ₹20 note. How much change does he get?", visual: "20 − (3 × 6) = ?", options: ["₹1", "₹2", "₹3", "₹4"], correct: 1, explanation: "3 chocolates cost 3×6=₹18. His change is 20−18=₹2.", takeaway: "Find the total cost first, then subtract it from the amount paid.", skill: "Multi-Step Reasoning" },
      { prompt: "Fish is to Water as Bird is to ?", visual: null, options: ["Nest", "Air", "Tree", "Egg"], correct: 1, explanation: "A fish lives and moves in water, just as a bird lives and moves through air.", takeaway: "An analogy asks you to match the same kind of relationship between two pairs.", skill: "Analogies" },
      { prompt: "In a race, Aisha finished before Rohan, Rohan finished before Kiran, and Kiran finished before Om. Who finished last?", visual: null, options: ["Aisha", "Rohan", "Kiran", "Om"], correct: 3, explanation: "The finishing order is Aisha, Rohan, Kiran, Om — so Om finished last.", takeaway: "Chain 'before' clues together into one ordered line to find an end position.", skill: "Logical Ordering" },
    ],
  },
  {
    id: "pp2020", year: 2020, title: "2020 Practice Paper", difficulty: "Challenging",
    questions: [
      { prompt: "What comes next in the pattern?", visual: "10, 13, 11, 14, 12, ?", options: ["13", "14", "15", "16"], correct: 2, explanation: "The pattern alternates +3 then −2: 10→13(+3)→11(−2)→14(+3)→12(−2), so next is 12+3=15.", takeaway: "Some patterns swap between two different rules — check every other step.", skill: "Number Patterns" },
      { prompt: "In a code, each letter shifts back by 1 (B→A, C→B...). How is 'BUS' written in this code?", visual: "B→A, U→T, S→R", options: ["ATR", "ATS", "BTR", "ATQ"], correct: 0, explanation: "Shifting each letter back by 1: B→A, U→T, S→R, spelling ATR.", takeaway: "A code can shift letters backward instead of forward — read the rule carefully.", skill: "Coding-Decoding" },
      { prompt: "What is the value of the digit 7 in the number 872?", visual: null, options: ["7", "70", "700", "2"], correct: 1, explanation: "The 7 is in the tens place, so it stands for 7 tens, which is 70.", takeaway: "A digit's position tells you its real value, not just the digit itself.", skill: "Place Value" },
      { prompt: "Simran has 20 candies. She eats 6 and shares half of what remains with her brother. How many candies does she have left?", visual: "20 − 6 = 14, then half of 14", options: ["6", "7", "8", "10"], correct: 1, explanation: "After eating 6, she has 20−6=14 left. Sharing half means she keeps 14÷2=7.", takeaway: "Finish the subtraction step completely before splitting what remains.", skill: "Multi-Step Reasoning" },
      { prompt: "Look at 16, 20, 24, and 28. Which statement is true?", visual: null, options: ["All are odd", "All are multiples of 4", "All are multiples of 5", "All are prime"], correct: 1, explanation: "16÷4=4, 20÷4=5, 24÷4=6, 28÷4=7 — every number divides evenly by 4.", takeaway: "Try dividing every number by the same value to test a multiples rule.", skill: "Which Statement Is True?" },
      { prompt: "In how many ways can you make 15 by adding two single-digit numbers (1-9)?", visual: "6+9, 7+8", options: ["1", "2", "3", "4"], correct: 1, explanation: "The pairs that add to 15 using single digits are 6+9 and 7+8 — that's 2 ways.", takeaway: "List the pairs in order, starting from the smallest number, so none get repeated.", skill: "How Many Ways?" },
      { prompt: "Look at this list. Which animal is 3rd?", visual: "🐶 🐱 🐰 🐻", options: ["Dog 🐶", "Cat 🐱", "Rabbit 🐰", "Bear 🐻"], correct: 2, explanation: "Counting from the left, Dog is 1st, Cat is 2nd, and Rabbit is 3rd.", takeaway: "Count carefully from the start whenever a question asks for a position.", skill: "Sequence Memory" },
      { prompt: "If you rotate the letter 'b' by 180°, which letter does it look like?", visual: "b → ?", options: ["d", "p", "q", "b"], correct: 2, explanation: "Turning 'b' upside down flips both the loop and the stem, turning it into 'q'.", takeaway: "Rotating 180° flips a shape both up-down and left-right at once.", skill: "Rotations" },
    ],
  },
  {
    id: "pp2019", year: 2019, title: "2019 Practice Paper", difficulty: "Medium+",
    questions: [
      { prompt: "What comes next in this doubling-and-adding pattern?", visual: "2, 5, 11, 23, ?", options: ["35", "41", "47", "53"], correct: 2, explanation: "Each number is doubled and then 1 is added: 2×2+1=5, 5×2+1=11, 11×2+1=23, so 23×2+1=47.", takeaway: "When a pattern grows fast, try doubling the number and then adjusting by a small amount.", skill: "Pattern Discovery" },
      { prompt: "Aman buys a notebook for ₹18 and a pen for ₹7. He pays with a ₹50 note. How much change does he get?", visual: "50 − (18 + 7) = ?", options: ["₹15", "₹20", "₹25", "₹30"], correct: 2, explanation: "The notebook and pen together cost 18+7=₹25. His change is 50−25=₹25.", takeaway: "Add up the total cost first, then subtract it from the money paid.", skill: "Multi-Step Reasoning" },
      { prompt: "Which of these numbers is NOT a multiple of 4?", visual: "8, 12, 16, 18", options: ["8", "12", "16", "18"], correct: 3, explanation: "8, 12, and 16 all divide evenly by 4, but 18÷4 leaves a remainder, so it isn't a multiple of 4.", takeaway: "Check each number by dividing it by 4 — no remainder means it's a multiple.", skill: "Multiples" },
      { prompt: "Puppy is to Dog as Kitten is to ?", visual: null, options: ["Cat", "Cub", "Calf", "Chick"], correct: 0, explanation: "A puppy is a baby dog, just as a kitten is a baby cat.", takeaway: "An analogy asks you to match the same kind of relationship in a new pair.", skill: "Analogies" },
      { prompt: "How many squares (⬛) are in this row?", visual: "⬛ 🔺 ⬛ ⭕ ⬛ 🔺", options: ["2", "3", "4", "5"], correct: 1, explanation: "Counting only the square shapes ⬛ in the row, there are 3 of them.", takeaway: "Count one shape type at a time so different shapes don't get mixed up.", skill: "Embedded Figures" },
      { prompt: "Kabir is older than Zoya. Zoya is older than Arjun. Who is the youngest?", visual: null, options: ["Kabir", "Zoya", "Arjun", "Cannot tell"], correct: 2, explanation: "Kabir is older than Zoya, and Zoya is older than Arjun, so Arjun is the youngest of the three.", takeaway: "Line up age clues in order to compare people you can't see directly.", skill: "Logical Deduction" },
      { prompt: "Estimate: 48 + 33 is closest to?", visual: "48 + 33 ≈ ?", options: ["70", "80", "90", "100"], correct: 1, explanation: "48 rounds to 50 and 33 rounds to 30. 50+30=80, close to the exact answer.", takeaway: "Round each number to the nearest ten before adding to estimate quickly.", skill: "Estimation" },
      { prompt: "A clock shows half past 7. What time is it?", visual: "🕢", options: ["7:00", "7:15", "7:30", "7:45"], correct: 2, explanation: "\"Half past\" means 30 minutes after the hour, so half past 7 is 7:30.", takeaway: "\"Half past\" always means the minute hand is pointing at the 6, which is 30 minutes.", skill: "Reading Clocks" },
    ],
  },
  {
    id: "pp2018", year: 2018, title: "2018 Practice Paper", difficulty: "Medium+",
    questions: [
      { prompt: "What comes next in the pattern?", visual: "2, 4, 7, 11, ?", options: ["14", "15", "16", "17"], correct: 2, explanation: "The gaps grow by 1 each time: +2, +3, +4, so the next gap is +5: 11+5=16.", takeaway: "When numbers speed up, look at how much the gap itself is growing.", skill: "Pattern Discovery" },
      { prompt: "In a code, each letter shifts forward by 2 (A→C, B→D...). How is 'CAT' written in this code?", visual: "C→E, A→C, T→V", options: ["ECV", "EDV", "DCU", "ECU"], correct: 0, explanation: "Shifting each letter forward by 2: C→E, A→C, T→V, spelling ECV.", takeaway: "Move every letter forward by the same amount, one at a time.", skill: "Coding-Decoding" },
      { prompt: "Which of these is not a vehicle?", visual: "🚗 🚌 🚲 🐎", options: ["Car 🚗", "Bus 🚌", "Bicycle 🚲", "Horse 🐎"], correct: 3, explanation: "A car, bus, and bicycle are all built to carry people from place to place. A horse is a living animal, not a built vehicle.", takeaway: "A vehicle is something people build for carrying people or goods.", skill: "Classification" },
      { prompt: "What is half of 20?", visual: "20 ÷ 2 = ?", options: ["8", "10", "12", "15"], correct: 1, explanation: "Splitting 20 into two equal groups gives 10 in each group.", takeaway: "Finding half of a number is the same as dividing it by 2.", skill: "Halves & Doubles" },
      { prompt: "Find the missing number.", visual: "5 × ? = 20", options: ["3", "4", "5", "6"], correct: 1, explanation: "5 times what equals 20? 5×4=20. You can check using division: 20÷5=4.", takeaway: "Turn a missing-number multiplication into a division check.", skill: "Missing Numbers" },
      { prompt: "Which letter has a line of symmetry?", visual: "H   F   P   L", options: ["H", "F", "P", "L"], correct: 0, explanation: "Folding the letter H down the middle makes both halves match perfectly.", takeaway: "A shape is symmetric if folding it in half makes both sides match exactly.", skill: "Symmetry" },
      { prompt: "A movie starts at 2:30 and ends at 3:15. How long is the movie?", visual: "2:30 → 3:15", options: ["30 minutes", "45 minutes", "1 hour", "1 hour 15 minutes"], correct: 1, explanation: "From 2:30 to 3:00 is 30 minutes, and from 3:00 to 3:15 is another 15 minutes: 30+15=45 minutes.", takeaway: "Break the time gap into easy chunks, like up to the next hour, then the rest.", skill: "Time Duration" },
      { prompt: "Maya is taller than Neha. Neha is taller than Priya. Who is the tallest?", visual: null, options: ["Maya", "Neha", "Priya", "Cannot tell"], correct: 0, explanation: "Maya is taller than Neha, and Neha is taller than Priya, so Maya is the tallest of the three.", takeaway: "Chain height clues together to find who's tallest or shortest.", skill: "Logical Deduction" },
    ],
  },
  {
    id: "pp2017", year: 2017, title: "2017 Practice Paper", difficulty: "Easy+",
    questions: [
      { prompt: "Skip count by 4s. What comes next?", visual: "4, 8, 12, 16, ?", options: ["18", "20", "22", "24"], correct: 1, explanation: "Each number is 4 more than the last: 16+4=20.", takeaway: "Skip counting means adding the same number over and over.", skill: "Skip Counting" },
      { prompt: "Bird is to Nest as Bee is to ?", visual: null, options: ["Web", "Hive", "Den", "Burrow"], correct: 1, explanation: "A bird lives in a nest, just as a bee lives in a hive.", takeaway: "An analogy matches the same kind of relationship between two pairs of things.", skill: "Analogies" },
      { prompt: "How many corners does a cube have?", visual: "🧊", options: ["4", "6", "8", "12"], correct: 2, explanation: "A cube has 8 corners, where three edges meet at each one.", takeaway: "Counting a solid shape's corners, edges, and faces separately helps you describe it.", skill: "3D Objects" },
      { prompt: "A clock shows 6 o'clock. What number does the hour hand point to?", visual: "🕕 = 6:00", options: ["3", "6", "9", "12"], correct: 1, explanation: "At 6 o'clock exactly, the short hour hand points straight at the 6.", takeaway: "The short hand on a clock always shows the hour.", skill: "Reading Clocks" },
      { prompt: "Find the missing number.", visual: "? + 9 = 20", options: ["9", "10", "11", "12"], correct: 2, explanation: "20 minus 9 gives the missing number: 20−9=11. Check: 11+9=20.", takeaway: "Use subtraction to find a missing number in an addition puzzle.", skill: "Missing Numbers" },
      { prompt: "Which of these numbers is odd?", visual: "14, 22, 37, 40", options: ["14", "22", "37", "40"], correct: 2, explanation: "37 ends in 7, and numbers ending in 1, 3, 5, 7, or 9 are always odd.", takeaway: "Check only the last digit to know if a number is odd or even.", skill: "Odd & Even Numbers" },
      { prompt: "A, B, C, D, E, F... What letter comes 3 steps after C?", visual: null, options: ["D", "E", "F", "G"], correct: 2, explanation: "Starting at C: 1 step is D, 2 steps is E, 3 steps is F.", takeaway: "Count each step one at a time along the alphabet to avoid mistakes.", skill: "Sequence Memory" },
      { prompt: "Rita had 12 stickers. She gave 4 to a friend and then got 6 more. How many stickers does she have now?", visual: "12 − 4 + 6 = ?", options: ["12", "14", "16", "18"], correct: 1, explanation: "First 12−4=8. Then 8+6=14 stickers.", takeaway: "Solve two-step problems one step at a time, in the order they happen.", skill: "Multi-Step Reasoning" },
    ],
  },
  {
    id: "pp2016", year: 2016, title: "2016 Practice Paper", difficulty: "Easy+",
    questions: [
      { prompt: "What comes next in the pattern?", visual: "3, 6, 9, 12, ?", options: ["13", "14", "15", "16"], correct: 2, explanation: "Each number increases by 3: 12+3=15.", takeaway: "Find the constant gap between numbers to continue a pattern.", skill: "Number Patterns" },
      { prompt: "Which one does not belong with the others?", visual: "🌹 🌷 🌻 🧅", options: ["Rose 🌹", "Tulip 🌷", "Sunflower 🌻", "Onion 🧅"], correct: 3, explanation: "Rose, tulip, and sunflower are all flowers. An onion is a vegetable, so it doesn't belong.", takeaway: "Find what the group has in common before spotting the one that's different.", skill: "Classification" },
      { prompt: "How many sides does a pentagon have?", visual: "⬠", options: ["4", "5", "6", "7"], correct: 1, explanation: "\"Penta\" means five, so a pentagon always has 5 sides.", takeaway: "A shape's name often hints at its number of sides.", skill: "Shape Recognition" },
      { prompt: "What day comes 2 days after Wednesday?", visual: null, options: ["Thursday", "Friday", "Saturday", "Sunday"], correct: 1, explanation: "One day after Wednesday is Thursday, and two days after is Friday.", takeaway: "Count forward one day at a time to find a day that comes 'after'.", skill: "Days & Calendar" },
      { prompt: "Which sign is missing?", visual: "8  ?  2  =  4", options: ["+", "−", "×", "÷"], correct: 3, explanation: "8 divided into groups of 2 gives 4 groups: 8÷2=4.", takeaway: "When a bigger number splits evenly into a smaller answer, think division.", skill: "Missing Operator" },
      { prompt: "You have 3 coins worth ₹2 each. How much money do you have?", visual: "🪙🪙🪙", options: ["₹4", "₹5", "₹6", "₹8"], correct: 2, explanation: "3 coins of ₹2 each: 2+2+2=₹6.", takeaway: "Counting equal coins is the same as repeated addition.", skill: "Counting Money" },
      { prompt: "Which number is smaller?", visual: "56   or   65", options: ["56", "65", "They are equal", "Cannot tell"], correct: 0, explanation: "56 has a 5 in the tens place while 65 has a 6 in the tens place. Fewer tens means a smaller number.", takeaway: "Compare the tens digit first when two numbers have the same number of digits.", skill: "Number Comparison" },
      { prompt: "Ravi has 5 pencils. He buys 3 more and then gives away 2. How many pencils does he have now?", visual: "5 + 3 − 2 = ?", options: ["4", "5", "6", "8"], correct: 2, explanation: "First 5+3=8. Then 8−2=6 pencils.", takeaway: "Solve two-step problems one step at a time, in the order they happen.", skill: "Multi-Step Reasoning" },
    ],
  },
];

const DIFFICULTY_RANK = { "Easy": 1, "Easy+": 2, "Medium": 3, "Medium+": 4, "Challenging": 5, "Olympiad Challenge": 6 };

/* ============================== HELPERS ============================== */

function flattenThinksheets() {
  const list = [];
  WORLDS.forEach((w, wi) => {
    w.thinksheets.forEach((ts, ti) => {
      list.push({ worldIdx: wi, tsIdx: ti, worldId: w.id, ts });
    });
  });
  return list;
}
const ALL_THINKSHEETS = flattenThinksheets();
const TOTAL_THINKSHEETS = ALL_THINKSHEETS.length;

function starsForAccuracy(pct) {
  if (pct >= 90) return 3;
  if (pct >= 70) return 2;
  return 1;
}

function initialProfile() {
  return {
    name: "Explorer",
    points: 0,
    completed: {}, // tsId -> { accuracy, stars, difficulty, category, correct, total }
    olympiadDone: false,
    olympiadScore: null,
    pastPapers: {}, // paperId -> { accuracy, stars, correct, total, year, completedAt }
    bestStreak: 0,
    badges: [],
  };
}

const APP_STATE_STORAGE_KEY = "brainquest_state";

// resume: { worldIdx, tsId, isOlympiad, isPastPaper, session } for an in-progress ThinkSheet, or null
function loadAppState() {
  try {
    const raw = localStorage.getItem(APP_STATE_STORAGE_KEY);
    if (!raw) return { profile: initialProfile(), resume: null };
    const parsed = JSON.parse(raw);
    return { profile: { ...initialProfile(), ...parsed.profile }, resume: parsed.resume || null };
  } catch {
    return { profile: initialProfile(), resume: null };
  }
}

function saveAppState(state) {
  try {
    localStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage unavailable (e.g. private browsing) — progress just won't persist
  }
}

// Rehydrates a persisted `resume` pointer into the actual thinksheet + session, or null if it no longer resolves.
function resolveResume(resume) {
  if (!resume || !resume.session) return null;
  const ts = resume.isOlympiad
    ? OLYMPIAD_TEST
    : resume.isPastPaper
    ? PAST_PAPERS.find((p) => p.id === resume.tsId)
    : WORLDS[resume.worldIdx]?.thinksheets.find((t) => t.id === resume.tsId);
  if (!ts) return null;
  return {
    worldIdx: resume.worldIdx,
    activeThinksheet: { worldIdx: resume.worldIdx, ts, isOlympiad: !!resume.isOlympiad, isPastPaper: !!resume.isPastPaper },
    session: resume.session,
  };
}

const INITIAL_APP_STATE = typeof window !== "undefined" ? loadAppState() : { profile: initialProfile(), resume: null };
const INITIAL_RESUME = resolveResume(INITIAL_APP_STATE.resume);

/* ============================== UI PRIMITIVES ============================== */

function StatChip({ icon, value, color, label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)",
      borderRadius: 999, padding: "6px 12px", color: "#fff",
    }}>
      <span style={{ color }}>{icon}</span>
      <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 15 }}>{value}</span>
      {label && <span style={{ fontSize: 11, opacity: 0.75 }}>{label}</span>}
    </div>
  );
}

function BigCard({ title, subtitle, emoji, color, onClick, locked, footer }) {
  return (
    <button
      onClick={locked ? undefined : onClick}
      style={{
        textAlign: "left", border: "none", cursor: locked ? "default" : "pointer",
        borderRadius: 24, padding: "18px 20px", position: "relative", overflow: "hidden",
        background: locked ? "#EDEDF4" : "#fff",
        boxShadow: locked ? "none" : "0 6px 0 rgba(27,27,63,0.10), 0 10px 24px rgba(27,27,63,0.08)",
        width: "100%", opacity: locked ? 0.7 : 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
          background: locked ? "#D9D9E6" : color + "22", fontSize: 28, flexShrink: 0,
        }}>
          {locked ? <Lock size={22} color="#8888a0" /> : emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 17, color: "#1B1B3F" }}>{title}</div>
          {subtitle && <div style={{ fontSize: 13, color: "#6B6B85", marginTop: 2 }}>{subtitle}</div>}
        </div>
        {!locked && <ChevronRight size={20} color="#B7B7CC" />}
      </div>
      {footer && <div style={{ marginTop: 12 }}>{footer}</div>}
    </button>
  );
}

function ProgressBar({ pct, color = "#2EC4B6" }) {
  return (
    <div style={{ background: "#EDEDF4", borderRadius: 999, height: 10, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 999, transition: "width 0.5s ease" }} />
    </div>
  );
}

function StarsRow({ count, size = 18 }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[0, 1, 2].map((i) => (
        <Star key={i} size={size} fill={i < count ? "#FFC53D" : "none"} color={i < count ? "#FFC53D" : "#D9D9E6"} strokeWidth={2} />
      ))}
    </div>
  );
}

/* ============================== MAIN APP ============================== */

export default function App() {
  const [view, setView] = useState(INITIAL_RESUME ? "player" : "home"); // home | world | player | complete | parent | olympiadIntro
  const [profile, setProfile] = useState(INITIAL_APP_STATE.profile);
  const [activeWorldIdx, setActiveWorldIdx] = useState(INITIAL_RESUME ? INITIAL_RESUME.worldIdx : 0);
  const [activeThinksheet, setActiveThinksheet] = useState(INITIAL_RESUME ? INITIAL_RESUME.activeThinksheet : null); // { worldIdx, tsIdx, ts, isOlympiad }
  const [session, setSession] = useState(INITIAL_RESUME ? INITIAL_RESUME.session : null);
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    const resume = view === "player" && activeThinksheet && session
      ? {
          worldIdx: activeThinksheet.worldIdx, tsId: activeThinksheet.ts.id,
          isOlympiad: !!activeThinksheet.isOlympiad, isPastPaper: !!activeThinksheet.isPastPaper, session,
        }
      : null;
    saveAppState({ profile, resume });
  }, [profile, view, activeThinksheet, session]);

  /* ---------- derived ---------- */

  const isWorldUnlocked = (wi) => {
    if (wi === 0) return true;
    const prevWorld = WORLDS[wi - 1];
    return prevWorld.thinksheets.some((ts) => profile.completed[ts.id]);
  };

  const isThinksheetUnlocked = (wi, ti) => {
    if (!isWorldUnlocked(wi)) return false;
    if (ti === 0) return true;
    const prevTs = WORLDS[wi].thinksheets[ti - 1];
    return !!profile.completed[prevTs.id];
  };

  const completedCount = Object.keys(profile.completed).length;
  const olympiadUnlocked = completedCount >= 4;

  const overallAccuracy = useMemo(() => {
    const vals = Object.values(profile.completed);
    if (vals.length === 0) return 0;
    const totalCorrect = vals.reduce((s, v) => s + v.correct, 0);
    const totalQ = vals.reduce((s, v) => s + v.total, 0);
    return totalQ ? Math.round((totalCorrect / totalQ) * 100) : 0;
  }, [profile.completed]);

  const categoryStats = useMemo(() => {
    const map = {};
    Object.values(profile.completed).forEach((v) => {
      if (!map[v.category]) map[v.category] = { correct: 0, total: 0 };
      map[v.category].correct += v.correct;
      map[v.category].total += v.total;
    });
    return Object.entries(map).map(([category, v]) => ({
      category, accuracy: v.total ? Math.round((v.correct / v.total) * 100) : 0, total: v.total,
    })).sort((a, b) => a.accuracy - b.accuracy);
  }, [profile.completed]);

  const highestDifficulty = useMemo(() => {
    let best = null, bestRank = 0;
    Object.values(profile.completed).forEach((v) => {
      const r = DIFFICULTY_RANK[v.difficulty] || 0;
      if (r > bestRank) { bestRank = r; best = v.difficulty; }
    });
    if (profile.olympiadDone) return "Olympiad Challenge";
    return best || "Not started";
  }, [profile.completed, profile.olympiadDone]);

  const nextIncomplete = useMemo(() => {
    for (const item of ALL_THINKSHEETS) {
      if (!profile.completed[item.ts.id] && isThinksheetUnlocked(item.worldIdx, item.tsIdx)) return item;
    }
    return null;
  }, [profile.completed]);

  const weakestCategory = categoryStats.length ? categoryStats[0] : null;
  const weakestWorld = weakestCategory ? WORLDS.find((w) => w.category === weakestCategory.category) : null;
  const practiceTarget = useMemo(() => {
    if (weakestWorld) {
      const incomplete = weakestWorld.thinksheets.find((ts) => !profile.completed[ts.id]);
      const wi = WORLDS.indexOf(weakestWorld);
      if (incomplete) return { worldIdx: wi, ts: incomplete };
      return { worldIdx: wi, ts: weakestWorld.thinksheets[0] };
    }
    return nextIncomplete ? { worldIdx: nextIncomplete.worldIdx, ts: nextIncomplete.ts } : null;
  }, [weakestWorld, nextIncomplete, profile.completed]);

  const readinessPct = Math.min(100, Math.round((completedCount / TOTAL_THINKSHEETS) * 70 + (profile.olympiadDone ? 30 : 0)));

  /* ---------- actions ---------- */

  function startThinksheet(worldIdx, ts, isOlympiad = false, isPastPaper = false) {
    setActiveThinksheet({ worldIdx, ts, isOlympiad, isPastPaper });
    setSession({
      qIdx: 0,
      answers: [],
      selected: null,
      showFeedback: false,
      correctCount: 0,
      streak: 0,
      bestStreakThisSession: 0,
      bonusMsg: null,
      startedAt: Date.now(),
    });
    setView("player");
  }

  function selectAnswer(optionIdx) {
    if (session.showFeedback) return;
    const q = activeThinksheet.ts.questions[session.qIdx];
    const isCorrect = optionIdx === q.correct;
    const newStreak = isCorrect ? session.streak + 1 : 0;
    let bonusMsg = null;
    if (isCorrect && newStreak > 0 && newStreak % 3 === 0) bonusMsg = "🔥 Speed Boost! 3 in a row!";
    if (!isCorrect && session.streak === 0 && session.answers.filter(a => !a.correct).length >= 1) bonusMsg = "🌱 Let's slow down and think it through.";

    setSession((s) => ({
      ...s,
      selected: optionIdx,
      showFeedback: true,
      correctCount: s.correctCount + (isCorrect ? 1 : 0),
      streak: newStreak,
      bestStreakThisSession: Math.max(s.bestStreakThisSession, newStreak),
      bonusMsg,
      answers: [...s.answers, { qIdx: s.qIdx, optionIdx, correct: isCorrect }],
    }));
  }

  function nextQuestion() {
    const total = activeThinksheet.ts.questions.length;
    if (session.qIdx + 1 >= total) {
      finishThinksheet();
    } else {
      setSession((s) => ({ ...s, qIdx: s.qIdx + 1, selected: null, showFeedback: false, bonusMsg: null }));
    }
  }

  function finishThinksheet() {
    const { ts, worldIdx, isOlympiad, isPastPaper } = activeThinksheet;
    const total = ts.questions.length;
    const correct = session.correctCount;
    const accuracy = Math.round((correct / total) * 100);
    const stars = starsForAccuracy(accuracy);
    const basePoints = correct * 10;
    const streakBonus = session.bestStreakThisSession >= 3 ? 15 : 0;
    const earnedPoints = basePoints + streakBonus;
    const timeTakenSec = Math.round((Date.now() - session.startedAt) / 1000);

    setProfile((p) => {
      const newBadges = [...p.badges];
      const newCompleted = { ...p.completed };
      const newPastPapers = { ...p.pastPapers };
      if (isPastPaper) {
        newPastPapers[ts.id] = { accuracy, stars, correct, total, year: ts.year };
        if (Object.keys(newPastPapers).length === PAST_PAPERS.length && !newBadges.includes("timeCapsule")) newBadges.push("timeCapsule");
      } else if (!isOlympiad) {
        newCompleted[ts.id] = {
          accuracy, stars, correct, total,
          difficulty: ts.difficulty,
          category: WORLDS[worldIdx].category,
        };
        if (Object.keys(p.completed).length === 0 && !newBadges.includes("firstSteps")) newBadges.push("firstSteps");
        const world = WORLDS[worldIdx];
        if (world.thinksheets.every((t) => newCompleted[t.id])) {
          const badgeId = world.id + "Master";
          if (!newBadges.includes(badgeId)) newBadges.push(badgeId);
        }
      }
      if (session.bestStreakThisSession >= 5 && !newBadges.includes("streakStar")) newBadges.push("streakStar");
      if (isOlympiad && accuracy >= 70 && !newBadges.includes("olympiadChampion")) newBadges.push("olympiadChampion");

      return {
        ...p,
        points: p.points + earnedPoints,
        completed: newCompleted,
        pastPapers: newPastPapers,
        olympiadDone: isOlympiad ? true : p.olympiadDone,
        olympiadScore: isOlympiad ? { accuracy, correct, total, timeTakenSec } : p.olympiadScore,
        bestStreak: Math.max(p.bestStreak, session.bestStreakThisSession),
        badges: newBadges,
      };
    });

    setLastResult({ ts, worldIdx, isOlympiad, isPastPaper, accuracy, stars, correct, total, earnedPoints, timeTakenSec });
    setView("complete");
  }

  function resetProgress() {
    setProfile(initialProfile());
    setView("home");
  }

  /* ============================== VIEWS ============================== */

  return (
    <div style={{
      minHeight: "100vh", width: "100%", fontFamily: "'Nunito', sans-serif",
      background: view === "player" || view === "complete" ? "#F6F5FB" : "linear-gradient(180deg, #1B1B3F 0%, #2A2A5A 55%, #33336B 100%)",
      color: "#1B1B3F",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        button { font-family: inherit; }
        @keyframes pop { 0% { transform: scale(0.7); opacity: 0; } 60% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); } }
        @keyframes floaty { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
        .pop { animation: pop 0.35s ease; }
        .floaty { animation: floaty 3s ease-in-out infinite; }
        .shake { animation: shake 0.3s ease; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: #cfcfe0; border-radius: 10px; }
      `}</style>

      {view === "home" && (
        <HomeView
          profile={profile} setView={setView} activeWorldIdx={activeWorldIdx} setActiveWorldIdx={setActiveWorldIdx}
          isWorldUnlocked={isWorldUnlocked} isThinksheetUnlocked={isThinksheetUnlocked}
          nextIncomplete={nextIncomplete} practiceTarget={practiceTarget} olympiadUnlocked={olympiadUnlocked}
          startThinksheet={startThinksheet} completedCount={completedCount}
        />
      )}

      {view === "world" && (
        <WorldView
          world={WORLDS[activeWorldIdx]} worldIdx={activeWorldIdx} profile={profile}
          isThinksheetUnlocked={isThinksheetUnlocked} startThinksheet={startThinksheet} setView={setView}
        />
      )}

      {view === "player" && activeThinksheet && session && (
        <PlayerView
          activeThinksheet={activeThinksheet} session={session} selectAnswer={selectAnswer}
          nextQuestion={nextQuestion} setView={setView}
        />
      )}

      {view === "complete" && lastResult && (
        <CompleteView
          result={lastResult} setView={setView} startThinksheet={startThinksheet}
          worlds={WORLDS} activeWorldIdx={activeWorldIdx} profile={profile}
        />
      )}

      {view === "pastPapers" && (
        <PastPapersView
          profile={profile} setView={setView} startThinksheet={startThinksheet}
        />
      )}

      {view === "olympiadIntro" && (
        <OlympiadIntroView
          unlocked={olympiadUnlocked} completedCount={completedCount} setView={setView}
          startThinksheet={() => startThinksheet(-1, OLYMPIAD_TEST, true)} profile={profile}
        />
      )}

      {view === "parent" && (
        <ParentView
          profile={profile} completedCount={completedCount} overallAccuracy={overallAccuracy}
          categoryStats={categoryStats} highestDifficulty={highestDifficulty} readinessPct={readinessPct}
          practiceTarget={practiceTarget} setView={setView} resetProgress={resetProgress}
        />
      )}
    </div>
  );
}

/* ============================== HOME ============================== */

function HomeView({ profile, setView, activeWorldIdx, setActiveWorldIdx, isWorldUnlocked, isThinksheetUnlocked, nextIncomplete, practiceTarget, olympiadUnlocked, startThinksheet, completedCount }) {
  const dailyTarget = nextIncomplete;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 40 }}>
      {/* header */}
      <div style={{ padding: "20px 20px 8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 700 }}>👋 Hi, {profile.name}!</div>
            <div style={{ color: "#fff", fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 24, marginTop: 2 }}>
              Your Learning Adventure
            </div>
          </div>
          <button onClick={() => setView("parent")} title="Parent Zone" style={{
            background: "rgba(255,255,255,0.14)", border: "none", borderRadius: 14, padding: "8px 10px",
            color: "#fff", display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
          }}>
            <Users size={16} />
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          <StatChip icon={<Star size={15} fill="#FFC53D" />} color="#FFC53D" value={profile.points} label="pts" />
          <StatChip icon={<Trophy size={15} />} color="#FFC53D" value={profile.badges.length} label="badges" />
          <StatChip icon={<Flame size={15} />} color="#FF6B6B" value={profile.bestStreak} label="best streak" />
        </div>
      </div>

      {/* world map */}
      <div style={{ padding: "18px 20px 6px" }}>
        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 700, marginBottom: 10 }}>🗺️ WORLD MAP</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {WORLDS.map((w, wi) => {
            const unlocked = isWorldUnlocked(wi);
            const doneCount = w.thinksheets.filter((ts) => profile.completed[ts.id]).length;
            const allDone = doneCount === w.thinksheets.length;
            return (
              <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28 }}>
                  {wi > 0 && <div style={{ width: 3, height: 18, background: unlocked ? w.color : "rgba(255,255,255,0.15)", borderRadius: 2 }} />}
                </div>
                <button
                  onClick={() => unlocked && (setActiveWorldIdx(wi), setView("world"))}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", gap: 12, textAlign: "left",
                    background: unlocked ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                    border: allDone ? `2px solid ${w.color}` : "2px solid transparent",
                    borderRadius: 18, padding: "10px 14px", margin: "4px 0", cursor: unlocked ? "pointer" : "default",
                  }}
                >
                  <div className={unlocked ? "floaty" : ""} style={{
                    width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                    background: unlocked ? w.color + "33" : "rgba(255,255,255,0.06)", fontSize: 22, flexShrink: 0,
                  }}>
                    {unlocked ? w.emoji : <Lock size={18} color="rgba(255,255,255,0.4)" />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: unlocked ? "#fff" : "rgba(255,255,255,0.4)", fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 15 }}>
                      {w.name}
                    </div>
                    <div style={{ color: unlocked ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)", fontSize: 11.5, marginTop: 1 }}>
                      {unlocked ? `${doneCount}/${w.thinksheets.length} ThinkSheets` : "Complete the world before"}
                    </div>
                  </div>
                  {unlocked && <ChevronRight size={18} color="rgba(255,255,255,0.4)" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* quick actions */}
      <div style={{ background: "#F6F5FB", borderRadius: "28px 28px 0 0", marginTop: 10, padding: "22px 20px 30px", display: "flex", flexDirection: "column", gap: 12 }}>
        {dailyTarget && (
          <BigCard
            title="Continue Adventure"
            subtitle={`${WORLDS[dailyTarget.worldIdx].name} · ${dailyTarget.ts.title}`}
            emoji="🚀" color={WORLDS[dailyTarget.worldIdx].color}
            onClick={() => startThinksheet(dailyTarget.worldIdx, dailyTarget.ts)}
          />
        )}
        {practiceTarget && (
          <BigCard
            title="Practice My Weak Areas"
            subtitle={`${WORLDS[practiceTarget.worldIdx].category}`}
            emoji="🧠" color="#9B5DE5"
            onClick={() => startThinksheet(practiceTarget.worldIdx, practiceTarget.ts)}
          />
        )}
        {dailyTarget && (
          <BigCard
            title="Today's Challenge"
            subtitle="Bonus points if you finish it today"
            emoji="⭐" color="#FFC53D"
            onClick={() => startThinksheet(dailyTarget.worldIdx, dailyTarget.ts)}
          />
        )}
        <BigCard
          title="Olympiad Arena"
          subtitle={olympiadUnlocked ? "Your mock test is ready" : `Complete ${4 - completedCount} more ThinkSheet${4 - completedCount === 1 ? "" : "s"} to unlock`}
          emoji="🏆" color="#FFC53D" locked={!olympiadUnlocked}
          onClick={() => setView("olympiadIntro")}
        />
        <BigCard
          title="Past Papers Vault"
          subtitle={`${PAST_PAPERS.length} yearly practice papers, ${PAST_PAPERS[PAST_PAPERS.length - 1].year}–${PAST_PAPERS[0].year}`}
          emoji="📚" color="#4EA8DE"
          onClick={() => setView("pastPapers")}
        />
      </div>
    </div>
  );
}

/* ============================== WORLD ============================== */

function WorldView({ world, worldIdx, profile, isThinksheetUnlocked, startThinksheet, setView }) {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 40 }}>
      <div style={{ padding: "20px 20px 10px" }}>
        <button onClick={() => setView("home")} style={{
          background: "rgba(255,255,255,0.14)", border: "none", borderRadius: 12, padding: "8px 10px", color: "#fff", cursor: "pointer",
        }}>
          <ArrowLeft size={16} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: world.color + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>
            {world.emoji}
          </div>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 22 }}>{world.name}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{world.blurb}</div>
          </div>
        </div>
      </div>

      <div style={{ background: "#F6F5FB", borderRadius: "28px 28px 0 0", marginTop: 16, padding: "22px 20px 30px", display: "flex", flexDirection: "column", gap: 12 }}>
        {world.thinksheets.map((ts, ti) => {
          const unlocked = isThinksheetUnlocked(worldIdx, ti);
          const done = profile.completed[ts.id];
          return (
            <BigCard
              key={ts.id}
              title={ts.title}
              subtitle={`${ts.difficulty} · ${ts.questions.length} questions`}
              emoji={done ? "✅" : "📘"}
              color={world.color}
              locked={!unlocked}
              onClick={() => startThinksheet(worldIdx, ts)}
              footer={done ? <StarsRow count={done.stars} size={16} /> : null}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ============================== PAST PAPERS ============================== */

function PastPapersView({ profile, setView, startThinksheet }) {
  const papersByYearDesc = [...PAST_PAPERS].sort((a, b) => b.year - a.year);
  const doneCount = papersByYearDesc.filter((p) => profile.pastPapers[p.id]).length;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 40 }}>
      <div style={{ padding: "20px 20px 10px" }}>
        <button onClick={() => setView("home")} style={{
          background: "rgba(255,255,255,0.14)", border: "none", borderRadius: 12, padding: "8px 10px", color: "#fff", cursor: "pointer",
        }}>
          <ArrowLeft size={16} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: "#4EA8DE33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>
            📚
          </div>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 22 }}>Past Papers Vault</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
              Original practice papers styled after each year, sorted newest first
            </div>
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 700, marginTop: 12 }}>
          {doneCount} / {papersByYearDesc.length} papers completed
        </div>
      </div>

      <div style={{ background: "#F6F5FB", borderRadius: "28px 28px 0 0", marginTop: 16, padding: "22px 20px 30px", display: "flex", flexDirection: "column", gap: 12 }}>
        {papersByYearDesc.map((paper) => {
          const done = profile.pastPapers[paper.id];
          return (
            <BigCard
              key={paper.id}
              title={`${paper.year} · ${paper.title}`}
              subtitle={`${paper.questions.length} questions · ${paper.difficulty}`}
              emoji={done ? "✅" : "🗓️"}
              color="#4EA8DE"
              onClick={() => startThinksheet(-2, paper, false, true)}
              footer={done ? <StarsRow count={done.stars} size={16} /> : null}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ============================== PLAYER ============================== */

function PlayerView({ activeThinksheet, session, selectAnswer, nextQuestion, setView }) {
  const { ts, isOlympiad, isPastPaper } = activeThinksheet;
  const q = ts.questions[session.qIdx];
  const total = ts.questions.length;
  const pct = Math.round(((session.qIdx) / total) * 100);
  const isCorrect = session.showFeedback && session.selected === q.correct;

  const [elapsedSec, setElapsedSec] = useState(() => Math.floor((Date.now() - session.startedAt) / 1000));
  useEffect(() => {
    const id = setInterval(() => setElapsedSec(Math.floor((Date.now() - session.startedAt) / 1000)), 1000);
    return () => clearInterval(id);
  }, [session.startedAt]);
  const timeStr = `${Math.floor(elapsedSec / 60)}:${String(elapsedSec % 60).padStart(2, "0")}`;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "18px 20px 10px", position: "sticky", top: 0, background: "#F6F5FB", zIndex: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => setView("home")} style={{ background: "#EDEDF4", border: "none", borderRadius: 12, padding: "7px 9px", cursor: "pointer" }}>
            <X size={16} color="#6B6B85" />
          </button>
          <div style={{ flex: 1 }}><ProgressBar pct={pct} color={isOlympiad ? "#FFC53D" : isPastPaper ? "#4EA8DE" : "#2EC4B6"} /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#6B6B85", fontSize: 12, fontWeight: 700 }}>
            <Flame size={14} color="#FF6B6B" /> {session.streak}
          </div>
        </div>
        <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#9B9BB5" }}>
            {isOlympiad ? "🏆 " : isPastPaper ? "📚 " : ""}Question {session.qIdx + 1} of {total} &middot; {ts.difficulty}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: "#9B9BB5" }}>
            <Clock size={13} color="#4EA8DE" /> {timeStr}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "10px 20px 30px", display: "flex", flexDirection: "column" }}>
        <div key={session.qIdx} className="pop" style={{
          background: "#fff", borderRadius: 24, padding: 20, boxShadow: "0 6px 0 rgba(27,27,63,0.06), 0 10px 24px rgba(27,27,63,0.05)",
        }}>
          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 600, fontSize: 17, lineHeight: 1.4, color: "#1B1B3F" }}>
            {q.prompt}
          </div>
          {q.visual && (
            <div style={{
              marginTop: 14, background: "#F6F5FB", borderRadius: 16, padding: "16px 12px", textAlign: "center",
              fontSize: 22, fontWeight: 700, letterSpacing: 1, color: "#1B1B3F", fontFamily: "'Baloo 2', sans-serif",
            }}>
              {q.visual}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
            {q.options.map((opt, oi) => {
              let bg = "#F6F5FB", border = "2px solid transparent", color = "#1B1B3F";
              if (session.showFeedback) {
                if (oi === q.correct) { bg = "#E7F9F4"; border = "2px solid #2EC4B6"; }
                else if (oi === session.selected) { bg = "#FFEEEE"; border = "2px solid #FF6B6B"; }
                else { bg = "#F6F5FB"; }
              }
              return (
                <button
                  key={oi}
                  onClick={() => selectAnswer(oi)}
                  disabled={session.showFeedback}
                  className={session.showFeedback && oi === session.selected && !isCorrect ? "shake" : ""}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left",
                    background: bg, border, borderRadius: 14, padding: "13px 16px", fontSize: 15, fontWeight: 700,
                    color, cursor: session.showFeedback ? "default" : "pointer",
                  }}
                >
                  <span>{opt}</span>
                  {session.showFeedback && oi === q.correct && <Check size={18} color="#2EC4B6" />}
                  {session.showFeedback && oi === session.selected && oi !== q.correct && <X size={18} color="#FF6B6B" />}
                </button>
              );
            })}
          </div>
        </div>

        {session.showFeedback && (
          <div className="pop" style={{
            marginTop: 14, borderRadius: 20, padding: 18,
            background: isCorrect ? "#E7F9F4" : "#FFF6E9",
            border: `2px solid ${isCorrect ? "#2EC4B6" : "#FFC53D"}`,
          }}>
            <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 16, color: isCorrect ? "#0E9A82" : "#B87700" }}>
              {isCorrect ? "🎉 Fantastic! You got it!" : "🤔 Nice try! Let's figure it out together."}
            </div>
            <div style={{ fontSize: 14, color: "#3A3A55", marginTop: 8, lineHeight: 1.5 }}>{q.explanation}</div>
            <div style={{
              marginTop: 10, background: "#fff", borderRadius: 12, padding: "10px 12px", fontSize: 13, color: "#6B6B85",
              display: "flex", gap: 8, alignItems: "flex-start",
            }}>
              <Sparkles size={15} color="#9B5DE5" style={{ flexShrink: 0, marginTop: 1 }} />
              <span><b style={{ color: "#1B1B3F" }}>What did I learn?</b> {q.takeaway}</span>
            </div>
            {session.bonusMsg && (
              <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: "#9B5DE5" }}>{session.bonusMsg}</div>
            )}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {session.showFeedback && (
          <button
            onClick={nextQuestion}
            style={{
              marginTop: 16, background: "#1B1B3F", color: "#fff", border: "none", borderRadius: 16,
              padding: "15px 20px", fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 16,
              cursor: "pointer", boxShadow: "0 4px 0 #0f0f28",
            }}
          >
            {session.qIdx + 1 >= total ? "See my results" : "Next question"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================== COMPLETE ============================== */

function CompleteView({ result, setView, startThinksheet, worlds, activeWorldIdx, profile }) {
  const { ts, worldIdx, isOlympiad, isPastPaper, accuracy, stars, correct, total, earnedPoints, timeTakenSec } = result;
  const mins = Math.floor(timeTakenSec / 60), secs = timeTakenSec % 60;
  const mistakes = total - correct;
  const skillsTouched = [...new Set(ts.questions.map((q) => q.skill))];

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column", padding: "40px 20px" }}>
      <div className="pop" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 56 }}>{isOlympiad ? "🏆" : isPastPaper ? "📚" : accuracy >= 90 ? "🌟" : accuracy >= 70 ? "🎉" : "💪"}</div>
        <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 24, color: "#1B1B3F", marginTop: 8 }}>
          {isOlympiad ? "Olympiad Score!" : isPastPaper ? "Practice Paper Complete!" : "ThinkSheet Complete!"}
        </div>
        <div style={{ color: "#6B6B85", fontSize: 14, marginTop: 2 }}>{ts.title}</div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <StarsRow count={stars} size={30} />
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 22, padding: 20, marginTop: 24, boxShadow: "0 6px 0 rgba(27,27,63,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <StatBlock icon={<Target size={16} color="#2EC4B6" />} label="Accuracy" value={`${accuracy}%`} />
          <StatBlock icon={<Clock size={16} color="#4EA8DE" />} label="Time taken" value={`${mins}m ${secs}s`} />
          <StatBlock icon={<Check size={16} color="#2EC4B6" />} label="Correct" value={`${correct} / ${total}`} />
          <StatBlock icon={<Gem size={16} color="#FFC53D" />} label="Points earned" value={`+${earnedPoints}`} />
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#9B9BB5", marginBottom: 6 }}>SKILLS PRACTICED</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {skillsTouched.map((s) => (
              <span key={s} style={{ background: "#F6F5FB", borderRadius: 999, padding: "4px 10px", fontSize: 12, color: "#3A3A55", fontWeight: 700 }}>{s}</span>
            ))}
          </div>
        </div>
        {mistakes > 0 && (
          <div style={{ marginTop: 14, fontSize: 13, color: "#B87700", background: "#FFF6E9", borderRadius: 12, padding: "10px 12px" }}>
            📝 {mistakes} question{mistakes > 1 ? "s" : ""} to revisit next time — that's how thinking muscles grow!
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
        <button onClick={() => setView(isPastPaper ? "pastPapers" : "home")} style={{
          background: "#1B1B3F", color: "#fff", border: "none", borderRadius: 16, padding: "15px 20px",
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 4px 0 #0f0f28",
        }}>
          {isPastPaper ? "Back to Past Papers" : isOlympiad ? "Back to Adventure" : "Continue Adventure"} <Rocket size={16} style={{ verticalAlign: -3, marginLeft: 6 }} />
        </button>
        <button onClick={() => startThinksheet(worldIdx, ts, isOlympiad, isPastPaper)} style={{
          background: "#fff", color: "#1B1B3F", border: "2px solid #EDEDF4", borderRadius: 16, padding: "13px 20px",
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <RotateCcw size={14} /> Play again
        </button>
      </div>
    </div>
  );
}

function StatBlock({ icon, label, value }) {
  return (
    <div style={{ background: "#F6F5FB", borderRadius: 14, padding: "10px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#9B9BB5", fontSize: 11, fontWeight: 700 }}>{icon}{label.toUpperCase()}</div>
      <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 18, color: "#1B1B3F", marginTop: 3 }}>{value}</div>
    </div>
  );
}

/* ============================== OLYMPIAD INTRO ============================== */

function OlympiadIntroView({ unlocked, completedCount, setView, startThinksheet, profile }) {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", padding: "20px 20px 40px", display: "flex", flexDirection: "column" }}>
      <button onClick={() => setView("home")} style={{
        alignSelf: "flex-start", background: "rgba(255,255,255,0.14)", border: "none", borderRadius: 12, padding: "8px 10px", color: "#fff", cursor: "pointer",
      }}>
        <ArrowLeft size={16} />
      </button>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <div className="floaty" style={{ fontSize: 64 }}>🏆</div>
        <div style={{ color: "#fff", fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 26, marginTop: 10 }}>Olympiad Arena</div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, marginTop: 6, maxWidth: 320, margin: "6px auto 0" }}>
          A mini mock test with tricky, Olympiad-style thinking questions — multi-step puzzles, patterns, and careful reading.
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 22, padding: 20, marginTop: 30 }}>
        {unlocked ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#2EC4B6", fontWeight: 700, fontSize: 14 }}>
              <Crown size={18} /> Unlocked — you're ready!
            </div>
            <div style={{ fontSize: 13, color: "#6B6B85", marginTop: 8 }}>
              10 questions · Olympiad Challenge difficulty · Every question gets a full explanation, even the ones you get right.
            </div>
            {profile.olympiadDone && (
              <div style={{ marginTop: 12, background: "#F6F5FB", borderRadius: 14, padding: 12, fontSize: 13, color: "#3A3A55" }}>
                Last score: <b>{profile.olympiadScore.correct}/{profile.olympiadScore.total}</b> ({profile.olympiadScore.accuracy}%)
              </div>
            )}
            <button onClick={startThinksheet} style={{
              marginTop: 16, width: "100%", background: "#FFC53D", color: "#1B1B3F", border: "none", borderRadius: 16,
              padding: "15px 20px", fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 4px 0 #C99000",
            }}>
              {profile.olympiadDone ? "Retake Mock Test" : "Start Mock Test"} 🚀
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#B87700", fontWeight: 700, fontSize: 14 }}>
              <Lock size={18} /> Locked for now
            </div>
            <div style={{ fontSize: 13, color: "#6B6B85", marginTop: 8 }}>
              Complete {4 - completedCount} more ThinkSheet{4 - completedCount === 1 ? "" : "s"} across any worlds to unlock the arena.
            </div>
            <ProgressBar pct={(completedCount / 4) * 100} color="#FFC53D" />
            <div style={{ fontSize: 12, color: "#9B9BB5", marginTop: 6 }}>{completedCount} / 4 ThinkSheets</div>
          </>
        )}
      </div>
    </div>
  );
}

/* ============================== PARENT DASHBOARD ============================== */

const BADGE_LABELS = {
  firstSteps: { emoji: "🥇", label: "First Steps" },
  numberKingdomMaster: { emoji: "🔢", label: "Number Kingdom Master" },
  patternPlanetMaster: { emoji: "🪐", label: "Pattern Planet Master" },
  logicLandMaster: { emoji: "🧩", label: "Logic Land Master" },
  shapeCityMaster: { emoji: "🏙️", label: "Shape City Master" },
  brainGalaxyMaster: { emoji: "🌌", label: "Brain Galaxy Master" },
  streakStar: { emoji: "🔥", label: "5-Streak Star" },
  olympiadChampion: { emoji: "👑", label: "Olympiad Champion" },
  timeCapsule: { emoji: "📚", label: "Time Capsule Champion" },
};

function ParentView({ profile, completedCount, overallAccuracy, categoryStats, highestDifficulty, readinessPct, practiceTarget, setView, resetProgress }) {
  const strong = categoryStats.slice(-2).reverse();
  const weak = categoryStats.slice(0, 2);

  return (
    <div style={{ background: "#F6F5FB", minHeight: "100vh" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => setView("home")} style={{ background: "#EDEDF4", border: "none", borderRadius: 12, padding: "8px 10px", cursor: "pointer" }}>
            <Home size={16} color="#6B6B85" />
          </button>
          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 17, color: "#1B1B3F" }}>Parent Dashboard</div>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
          <PStat label="ThinkSheets Completed" value={`${completedCount} / ${TOTAL_THINKSHEETS}`} />
          <PStat label="Overall Accuracy" value={`${overallAccuracy}%`} />
          <PStat label="Highest Difficulty" value={highestDifficulty} />
          <PStat label="Best Streak" value={`${profile.bestStreak} correct`} />
          <PStat label="Past Papers Done" value={`${Object.keys(profile.pastPapers).length} / ${PAST_PAPERS.length}`} />
        </div>

        <div style={{ background: "#fff", borderRadius: 18, padding: 18, marginTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1B1B3F" }}>🎯 Olympiad Readiness</div>
          <div style={{ marginTop: 10 }}><ProgressBar pct={readinessPct} color="#FFC53D" /></div>
          <div style={{ fontSize: 12, color: "#9B9BB5", marginTop: 6 }}>{readinessPct}% — based on ThinkSheets completed and mock test attempt</div>
        </div>

        <div style={{ background: "#fff", borderRadius: 18, padding: 18, marginTop: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1B1B3F", marginBottom: 10 }}>💪 Strong Areas</div>
          {strong.length ? strong.map((c) => <CategoryRow key={c.category} c={c} good />) : <EmptyNote text="Not enough data yet" />}
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1B1B3F", margin: "16px 0 10px" }}>📌 Needs Practice</div>
          {weak.length ? weak.map((c) => <CategoryRow key={c.category} c={c} />) : <EmptyNote text="Not enough data yet" />}
        </div>

        {practiceTarget && (
          <div style={{ background: "#fff", borderRadius: 18, padding: 18, marginTop: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1B1B3F" }}>📋 Recommended Next ThinkSheet</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
              <div style={{ fontSize: 24 }}>{WORLDS[practiceTarget.worldIdx].emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1B1B3F" }}>{practiceTarget.ts.title}</div>
                <div style={{ fontSize: 12, color: "#9B9BB5" }}>{WORLDS[practiceTarget.worldIdx].name} · {practiceTarget.ts.difficulty}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: "#fff", borderRadius: 18, padding: 18, marginTop: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1B1B3F", marginBottom: 10 }}>🎖️ Badges Earned</div>
          {profile.badges.length ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {profile.badges.map((b) => (
                <span key={b} style={{ background: "#F6F5FB", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 700, color: "#3A3A55" }}>
                  {BADGE_LABELS[b]?.emoji} {BADGE_LABELS[b]?.label}
                </span>
              ))}
            </div>
          ) : <EmptyNote text="No badges yet — keep going!" />}
        </div>

        <button onClick={resetProgress} style={{
          marginTop: 20, width: "100%", background: "transparent", border: "2px solid #EDEDF4", borderRadius: 14,
          padding: "12px", fontSize: 13, fontWeight: 700, color: "#B7B7CC", cursor: "pointer",
        }}>
          Reset demo progress
        </button>
      </div>
    </div>
  );
}

function PStat({ label, value }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "14px 14px" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#9B9BB5" }}>{label.toUpperCase()}</div>
      <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 18, color: "#1B1B3F", marginTop: 4 }}>{value}</div>
    </div>
  );
}

function CategoryRow({ c, good }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
        <span style={{ color: "#3A3A55", fontWeight: 700 }}>{c.category}</span>
        <span style={{ color: good ? "#2EC4B6" : "#FF6B6B", fontWeight: 700 }}>{c.accuracy}%</span>
      </div>
      <ProgressBar pct={c.accuracy} color={good ? "#2EC4B6" : "#FF6B6B"} />
    </div>
  );
}

function EmptyNote({ text }) {
  return <div style={{ fontSize: 12, color: "#B7B7CC" }}>{text}</div>;
}
