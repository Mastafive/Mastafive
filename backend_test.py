#!/usr/bin/env python3
"""
Backend API Testing Script for Contact Form and Admin Endpoints
Tests all contact form submission and admin management endpoints
"""

import requests
import json
from typing import Dict, Any, List
import sys

# Base URL from frontend/.env
BASE_URL = "https://mastafive-preview.preview.emergentagent.com/api"
ADMIN_PASSWORD = "M4574f1v394733p$"

# Color codes for output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'

test_results = {
    "passed": 0,
    "failed": 0,
    "errors": []
}

def log_test(test_name: str, passed: bool, details: str = ""):
    """Log test result with color coding"""
    if passed:
        print(f"{GREEN}✓ PASS{RESET}: {test_name}")
        test_results["passed"] += 1
    else:
        print(f"{RED}✗ FAIL{RESET}: {test_name}")
        if details:
            print(f"  {RED}Details: {details}{RESET}")
        test_results["failed"] += 1
        test_results["errors"].append(f"{test_name}: {details}")

def log_info(message: str):
    """Log informational message"""
    print(f"{BLUE}ℹ{RESET} {message}")

def log_warning(message: str):
    """Log warning message"""
    print(f"{YELLOW}⚠{RESET} {message}")

def test_status_endpoint():
    """Test that existing /api/status endpoints still work"""
    log_info("Testing existing /api/status endpoints...")
    
    # Test GET /api/status
    try:
        response = requests.get(f"{BASE_URL}/status", timeout=10)
        if response.status_code == 200:
            log_test("GET /api/status", True)
        else:
            log_test("GET /api/status", False, f"Status code: {response.status_code}")
    except Exception as e:
        log_test("GET /api/status", False, str(e))
    
    # Test POST /api/status
    try:
        payload = {"client_name": "test_client"}
        response = requests.post(f"{BASE_URL}/status", json=payload, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "id" in data and "client_name" in data and data["client_name"] == "test_client":
                log_test("POST /api/status", True)
            else:
                log_test("POST /api/status", False, "Response missing required fields")
        else:
            log_test("POST /api/status", False, f"Status code: {response.status_code}")
    except Exception as e:
        log_test("POST /api/status", False, str(e))

def test_contact_submission():
    """Test POST /api/contact endpoint"""
    log_info("\nTesting contact form submission...")
    
    # Test 1: Valid submission
    try:
        payload = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "subject": "General Inquiry",
            "message": "This is a test message from the automated testing script."
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if all(key in data for key in ["id", "name", "email", "subject", "message", "created_at"]):
                if data["name"] == payload["name"] and data["email"] == payload["email"]:
                    log_test("POST /api/contact - Valid submission", True)
                    return data["id"]  # Return ID for later tests
                else:
                    log_test("POST /api/contact - Valid submission", False, "Data mismatch in response")
            else:
                log_test("POST /api/contact - Valid submission", False, "Missing required fields in response")
        else:
            log_test("POST /api/contact - Valid submission", False, f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("POST /api/contact - Valid submission", False, str(e))
    
    return None

def test_contact_validation():
    """Test contact form validation"""
    log_info("\nTesting contact form validation...")
    
    # Test 2: Invalid email
    try:
        payload = {
            "name": "Jane Smith",
            "email": "invalid-email",
            "subject": "Test",
            "message": "Testing invalid email"
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        
        if response.status_code == 422:  # Validation error
            log_test("POST /api/contact - Invalid email validation", True)
        else:
            log_test("POST /api/contact - Invalid email validation", False, f"Expected 422, got {response.status_code}")
    except Exception as e:
        log_test("POST /api/contact - Invalid email validation", False, str(e))
    
    # Test 3: Missing required fields
    try:
        payload = {
            "name": "Test User"
            # Missing email and message
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        
        if response.status_code == 422:
            log_test("POST /api/contact - Missing required fields", True)
        else:
            log_test("POST /api/contact - Missing required fields", False, f"Expected 422, got {response.status_code}")
    except Exception as e:
        log_test("POST /api/contact - Missing required fields", False, str(e))

def test_admin_verify():
    """Test POST /api/admin/verify endpoint"""
    log_info("\nTesting admin password verification...")
    
    # Test with correct password
    try:
        headers = {"X-Admin-Password": ADMIN_PASSWORD}
        response = requests.post(f"{BASE_URL}/admin/verify", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True:
                log_test("POST /api/admin/verify - Correct password", True)
            else:
                log_test("POST /api/admin/verify - Correct password", False, "Response missing 'ok: true'")
        else:
            log_test("POST /api/admin/verify - Correct password", False, f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("POST /api/admin/verify - Correct password", False, str(e))
    
    # Test with wrong password
    try:
        headers = {"X-Admin-Password": "wrong_password"}
        response = requests.post(f"{BASE_URL}/admin/verify", headers=headers, timeout=10)
        
        if response.status_code == 401:
            log_test("POST /api/admin/verify - Wrong password returns 401", True)
        else:
            log_test("POST /api/admin/verify - Wrong password returns 401", False, f"Expected 401, got {response.status_code}")
    except Exception as e:
        log_test("POST /api/admin/verify - Wrong password returns 401", False, str(e))
    
    # Test with missing password
    try:
        response = requests.post(f"{BASE_URL}/admin/verify", timeout=10)
        
        if response.status_code == 401:
            log_test("POST /api/admin/verify - Missing password returns 401", True)
        else:
            log_test("POST /api/admin/verify - Missing password returns 401", False, f"Expected 401, got {response.status_code}")
    except Exception as e:
        log_test("POST /api/admin/verify - Missing password returns 401", False, str(e))

def test_admin_list_messages():
    """Test GET /api/admin/contact endpoint"""
    log_info("\nTesting admin list messages...")
    
    # Test with wrong password first
    try:
        headers = {"X-Admin-Password": "wrong_password"}
        response = requests.get(f"{BASE_URL}/admin/contact", headers=headers, timeout=10)
        
        if response.status_code == 401:
            log_test("GET /api/admin/contact - Wrong password returns 401", True)
        else:
            log_test("GET /api/admin/contact - Wrong password returns 401", False, f"Expected 401, got {response.status_code}")
    except Exception as e:
        log_test("GET /api/admin/contact - Wrong password returns 401", False, str(e))
    
    # Test with correct password
    try:
        headers = {"X-Admin-Password": ADMIN_PASSWORD}
        response = requests.get(f"{BASE_URL}/admin/contact", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                log_test("GET /api/admin/contact - Correct password", True)
                log_info(f"  Found {len(data)} contact messages")
                return data
            else:
                log_test("GET /api/admin/contact - Correct password", False, "Response is not a list")
        else:
            log_test("GET /api/admin/contact - Correct password", False, f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("GET /api/admin/contact - Correct password", False, str(e))
    
    return []

def test_admin_mark_read(message_id: str):
    """Test PATCH /api/admin/contact/{id} endpoint"""
    log_info(f"\nTesting mark message as read/unread (ID: {message_id})...")
    
    headers = {"X-Admin-Password": ADMIN_PASSWORD}
    
    # Mark as read
    try:
        response = requests.patch(
            f"{BASE_URL}/admin/contact/{message_id}?read=true",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True:
                log_test("PATCH /api/admin/contact/{id} - Mark as read", True)
            else:
                log_test("PATCH /api/admin/contact/{id} - Mark as read", False, "Response missing 'ok: true'")
        else:
            log_test("PATCH /api/admin/contact/{id} - Mark as read", False, f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("PATCH /api/admin/contact/{id} - Mark as read", False, str(e))
    
    # Mark as unread
    try:
        response = requests.patch(
            f"{BASE_URL}/admin/contact/{message_id}?read=false",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True:
                log_test("PATCH /api/admin/contact/{id} - Mark as unread", True)
            else:
                log_test("PATCH /api/admin/contact/{id} - Mark as unread", False, "Response missing 'ok: true'")
        else:
            log_test("PATCH /api/admin/contact/{id} - Mark as unread", False, f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("PATCH /api/admin/contact/{id} - Mark as unread", False, str(e))
    
    # Test with wrong password
    try:
        headers_wrong = {"X-Admin-Password": "wrong_password"}
        response = requests.patch(
            f"{BASE_URL}/admin/contact/{message_id}?read=true",
            headers=headers_wrong,
            timeout=10
        )
        
        if response.status_code == 401:
            log_test("PATCH /api/admin/contact/{id} - Wrong password returns 401", True)
        else:
            log_test("PATCH /api/admin/contact/{id} - Wrong password returns 401", False, f"Expected 401, got {response.status_code}")
    except Exception as e:
        log_test("PATCH /api/admin/contact/{id} - Wrong password returns 401", False, str(e))

def test_admin_delete_message(message_id: str):
    """Test DELETE /api/admin/contact/{id} endpoint"""
    log_info(f"\nTesting delete message (ID: {message_id})...")
    
    headers = {"X-Admin-Password": ADMIN_PASSWORD}
    
    # Test with wrong password first
    try:
        headers_wrong = {"X-Admin-Password": "wrong_password"}
        response = requests.delete(
            f"{BASE_URL}/admin/contact/{message_id}",
            headers=headers_wrong,
            timeout=10
        )
        
        if response.status_code == 401:
            log_test("DELETE /api/admin/contact/{id} - Wrong password returns 401", True)
        else:
            log_test("DELETE /api/admin/contact/{id} - Wrong password returns 401", False, f"Expected 401, got {response.status_code}")
    except Exception as e:
        log_test("DELETE /api/admin/contact/{id} - Wrong password returns 401", False, str(e))
    
    # Delete with correct password
    try:
        response = requests.delete(
            f"{BASE_URL}/admin/contact/{message_id}",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True:
                log_test("DELETE /api/admin/contact/{id} - Correct password", True)
            else:
                log_test("DELETE /api/admin/contact/{id} - Correct password", False, "Response missing 'ok: true'")
        else:
            log_test("DELETE /api/admin/contact/{id} - Correct password", False, f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("DELETE /api/admin/contact/{id} - Correct password", False, str(e))
    
    # Verify deletion - try to delete again
    try:
        response = requests.delete(
            f"{BASE_URL}/admin/contact/{message_id}",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 404:
            log_test("DELETE /api/admin/contact/{id} - Verify deletion (404 on re-delete)", True)
        else:
            log_test("DELETE /api/admin/contact/{id} - Verify deletion (404 on re-delete)", False, f"Expected 404, got {response.status_code}")
    except Exception as e:
        log_test("DELETE /api/admin/contact/{id} - Verify deletion (404 on re-delete)", False, str(e))

def create_test_messages():
    """Create multiple test messages for testing"""
    log_info("\nCreating test messages...")
    
    test_messages = [
        {
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "subject": "Product Inquiry",
            "message": "I would like to know more about your products and services."
        },
        {
            "name": "Bob Williams",
            "email": "bob.williams@example.com",
            "subject": "Technical Support",
            "message": "I'm experiencing issues with my account. Can you help?"
        },
        {
            "name": "Carol Martinez",
            "email": "carol.martinez@example.com",
            "subject": "",  # Empty subject
            "message": "Just wanted to say hello and provide some feedback on your website."
        }
    ]
    
    created_ids = []
    for i, msg in enumerate(test_messages, 1):
        try:
            response = requests.post(f"{BASE_URL}/contact", json=msg, timeout=10)
            if response.status_code == 200:
                data = response.json()
                created_ids.append(data["id"])
                log_info(f"  Created test message {i}/3 (ID: {data['id']})")
            else:
                log_warning(f"  Failed to create test message {i}/3: Status {response.status_code}")
        except Exception as e:
            log_warning(f"  Failed to create test message {i}/3: {str(e)}")
    
    return created_ids

def main():
    """Main test execution"""
    print(f"\n{BLUE}{'='*70}{RESET}")
    print(f"{BLUE}Backend API Testing - Contact Form & Admin Endpoints{RESET}")
    print(f"{BLUE}{'='*70}{RESET}\n")
    print(f"Base URL: {BASE_URL}")
    print(f"Admin Password: {ADMIN_PASSWORD}\n")
    
    # Test 1: Verify existing endpoints still work
    test_status_endpoint()
    
    # Test 2: Contact form submission and validation
    first_message_id = test_contact_submission()
    test_contact_validation()
    
    # Test 3: Create multiple test messages
    created_ids = create_test_messages()
    
    # Test 4: Admin password verification
    test_admin_verify()
    
    # Test 5: Admin list messages
    all_messages = test_admin_list_messages()
    
    # Test 6: Admin mark as read/unread
    if created_ids:
        test_admin_mark_read(created_ids[0])
    elif first_message_id:
        test_admin_mark_read(first_message_id)
    elif all_messages:
        test_admin_mark_read(all_messages[0]["id"])
    else:
        log_warning("No messages available to test mark as read/unread")
    
    # Test 7: Admin delete message
    if len(created_ids) > 1:
        test_admin_delete_message(created_ids[1])
    elif first_message_id:
        test_admin_delete_message(first_message_id)
    elif all_messages:
        test_admin_delete_message(all_messages[0]["id"])
    else:
        log_warning("No messages available to test deletion")
    
    # Print summary
    print(f"\n{BLUE}{'='*70}{RESET}")
    print(f"{BLUE}Test Summary{RESET}")
    print(f"{BLUE}{'='*70}{RESET}")
    print(f"{GREEN}Passed: {test_results['passed']}{RESET}")
    print(f"{RED}Failed: {test_results['failed']}{RESET}")
    
    if test_results["errors"]:
        print(f"\n{RED}Failed Tests:{RESET}")
        for error in test_results["errors"]:
            print(f"  {RED}•{RESET} {error}")
    
    print(f"\n{BLUE}{'='*70}{RESET}\n")
    
    # Exit with appropriate code
    sys.exit(0 if test_results["failed"] == 0 else 1)

if __name__ == "__main__":
    main()
