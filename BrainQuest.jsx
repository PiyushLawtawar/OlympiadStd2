import React, { useState, useMemo, useRef } from "react";
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
    bestStreak: 0,
    badges: [],
  };
}

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
  const [view, setView] = useState("home"); // home | world | player | complete | parent | olympiadIntro
  const [profile, setProfile] = useState(initialProfile());
  const [activeWorldIdx, setActiveWorldIdx] = useState(0);
  const [activeThinksheet, setActiveThinksheet] = useState(null); // { worldIdx, tsIdx, ts, isOlympiad }
  const [session, setSession] = useState(null);
  const [lastResult, setLastResult] = useState(null);

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

  function startThinksheet(worldIdx, ts, isOlympiad = false) {
    setActiveThinksheet({ worldIdx, ts, isOlympiad });
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
    const { ts, worldIdx, isOlympiad } = activeThinksheet;
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
      if (!isOlympiad) {
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

      return {
        ...p,
        points: p.points + earnedPoints,
        completed: newCompleted,
        olympiadDone: isOlympiad ? true : p.olympiadDone,
        olympiadScore: isOlympiad ? { accuracy, correct, total, timeTakenSec } : p.olympiadScore,
        bestStreak: Math.max(p.bestStreak, session.bestStreakThisSession),
        badges: isOlympiad && accuracy >= 70 && !newBadges.includes("olympiadChampion") ? [...newBadges, "olympiadChampion"] : newBadges,
      };
    });

    setLastResult({ ts, worldIdx, isOlympiad, accuracy, stars, correct, total, earnedPoints, timeTakenSec });
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

/* ============================== PLAYER ============================== */

function PlayerView({ activeThinksheet, session, selectAnswer, nextQuestion, setView }) {
  const { ts, isOlympiad } = activeThinksheet;
  const q = ts.questions[session.qIdx];
  const total = ts.questions.length;
  const pct = Math.round(((session.qIdx) / total) * 100);
  const isCorrect = session.showFeedback && session.selected === q.correct;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "18px 20px 10px", position: "sticky", top: 0, background: "#F6F5FB", zIndex: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => setView("home")} style={{ background: "#EDEDF4", border: "none", borderRadius: 12, padding: "7px 9px", cursor: "pointer" }}>
            <X size={16} color="#6B6B85" />
          </button>
          <div style={{ flex: 1 }}><ProgressBar pct={pct} color={isOlympiad ? "#FFC53D" : "#2EC4B6"} /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#6B6B85", fontSize: 12, fontWeight: 700 }}>
            <Flame size={14} color="#FF6B6B" /> {session.streak}
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: "#9B9BB5" }}>
          {isOlympiad ? "🏆 " : ""}Question {session.qIdx + 1} of {total} &middot; {ts.difficulty}
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
  const { ts, worldIdx, isOlympiad, accuracy, stars, correct, total, earnedPoints, timeTakenSec } = result;
  const mins = Math.floor(timeTakenSec / 60), secs = timeTakenSec % 60;
  const mistakes = total - correct;
  const skillsTouched = [...new Set(ts.questions.map((q) => q.skill))];

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column", padding: "40px 20px" }}>
      <div className="pop" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 56 }}>{isOlympiad ? "🏆" : accuracy >= 90 ? "🌟" : accuracy >= 70 ? "🎉" : "💪"}</div>
        <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 24, color: "#1B1B3F", marginTop: 8 }}>
          {isOlympiad ? "Olympiad Score!" : "ThinkSheet Complete!"}
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
        <button onClick={() => setView("home")} style={{
          background: "#1B1B3F", color: "#fff", border: "none", borderRadius: 16, padding: "15px 20px",
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 4px 0 #0f0f28",
        }}>
          {isOlympiad ? "Back to Adventure" : "Continue Adventure"} <Rocket size={16} style={{ verticalAlign: -3, marginLeft: 6 }} />
        </button>
        <button onClick={() => startThinksheet(worldIdx, ts, isOlympiad)} style={{
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
