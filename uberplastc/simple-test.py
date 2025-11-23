import requests
import time

def test_api():
    print("Testing Uber Plastic Python API...")
    print("=" * 40)
    
    try:
        response = requests.get("http://localhost:8000/health", timeout=5)
        if response.status_code == 200:
            print("SUCCESS: API is running!")
            print("Response:", response.json())
            return True
        else:
            print("ERROR: API returned status", response.status_code)
            return False
    except requests.exceptions.ConnectionError:
        print("ERROR: Cannot connect to API on port 8000")
        print("Make sure the Python server is running:")
        print("  cd python-backend")
        print("  python main.py")
        return False
    except Exception as e:
        print("ERROR:", str(e))
        return False

if __name__ == "__main__":
    print("Waiting 3 seconds for server to start...")
    time.sleep(3)
    test_api()


