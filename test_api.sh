#!/bin/bash
# Quick API Testing Script for OctoFit Tracker

# Set your local base URL
BASE_URL="http://localhost:8000/api"

echo "=== OctoFit Tracker API Testing ==="
echo "Base URL: $BASE_URL"
echo ""

# Test 1: API Root
echo "1. Testing API Root Endpoint..."
echo "curl $BASE_URL/"
echo ""

# Test 2: Users List
echo "2. Testing Users List..."
echo "curl $BASE_URL/users/"
echo ""

# Test 3: Teams List
echo "3. Testing Teams List..."
echo "curl $BASE_URL/teams/"
echo ""

# Test 4: Activities List
echo "4. Testing Activities List..."
echo "curl $BASE_URL/activities/"
echo ""

# Test 5: Workouts List
echo "5. Testing Workouts List..."
echo "curl $BASE_URL/workouts/"
echo ""

# Test 6: Leaderboard
echo "6. Testing Leaderboard..."
echo "curl $BASE_URL/leaderboard/"
echo ""

echo "=== To run actual tests, execute the curl commands above ==="
