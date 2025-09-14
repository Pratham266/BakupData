# from selenium import webdriver
# from selenium.webdriver.common.by import By
# import time
# import random

# # # Array of Indian personas
# # indian_personas = [
# #     {"name": "Priya Verma", "company": "Verma Solutions", "contact": "9823456789"},
# #     {"name": "Rahul Mehta", "company": "Mehta Enterprises", "contact": "9934567812"},
# #     {"name": "Sneha Iyer", "company": "Iyer Technologies", "contact": "9988776655"},
# #     {"name": "Vikram Patel", "company": "Patel Industries", "contact": "9812345678"},
# #     {"name": "Ananya Reddy", "company": "Reddy Innovations", "contact": "9876123456"},
# #     {"name": "Suresh Nair", "company": "Nair & Co.", "contact": "9753124680"},
# #     {"name": "Pooja Singh", "company": "Singh Solutions", "contact": "9887654321"},
# #     {"name": "Manoj Gupta", "company": "Gupta Steel", "contact": "9965321789"},
# #     {"name": "Neha Joshi", "company": "Joshi Technologies", "contact": "9998887776"}
# # ]

# # Load Chrome WebDriver
# driver = webdriver.Chrome()

# # Open Google Form
# form_url = "https://docs.google.com/forms/d/e/1FAIpQLSf7yAB-7VtV2ISyReOkmOcIRajR9TMT5sgWt_1JzAgWbJqTRg/viewform"
# if not form_url.startswith("https://"):
#     print("Invalid URL! Please check the Google Form link.")
#     exit()
# driver.get(form_url)
# time.sleep(4)  # Allow time for the page to load

# # Function to fill the form
# def fill_form():
#     try:
#         persona = random.choice(indian_personas)

#         # Fill First Section: Name, Company Name, Contact Number
#         text_fields = driver.find_elements(By.CSS_SELECTOR, 'input[type="text"]')
#         if len(text_fields) >= 2:
#             text_fields[0].send_keys(persona["name"])  # Name
#             text_fields[1].send_keys(persona["company"])  # Company Name

#         # Fill Contact Number field
#         text_fields = driver.find_elements(By.CSS_SELECTOR, 'input[type="tel"], input[type="text"]')
#         if len(text_fields) >= 3:
#             text_fields[2].send_keys(persona["contact"])  # Contact Number

#         # Click Next Button to go to next section
#         try:
#             next_button = driver.find_element(By.XPATH, "//span[contains(text(),'Next')]")
#             next_button.click()
#             time.sleep(2)
#         except:
#             print("No 'Next' button found, moving forward...")

#         # Loop through sections
#         while True:
#             time.sleep(2)  # Wait for section to load

#             # Get all radio button groups in the section
#             sections = driver.find_elements(By.CSS_SELECTOR, 'div[role="radiogroup"]')

#             for section in sections:
#                 # Get all valid radio buttons in the section
#                 radio_buttons = section.find_elements(By.CSS_SELECTOR, 'div[role="radio"]')

#                 # Filter out "Other" option
#                 valid_options = [rb for rb in radio_buttons if rb.get_attribute("aria-label") and "Other" not in rb.get_attribute("aria-label")]
                
#                 if valid_options:
#                     random.choice(valid_options).click()  # Select a random valid option
#                     time.sleep(1)  # Wait between selections

#             # Check for "Next" or "Submit" button
#             buttons = driver.find_elements(By.XPATH, "//span[contains(text(),'Next')] | //span[contains(text(),'Submit')]")
#             if buttons:
#                 button_text = buttons[0].text.strip()
                
#                 # Click Next or Submit button
#                 buttons[0].click()
#                 time.sleep(2)  
                
#                 # Stop loop if it's the Submit button
#                 if "Submit" in button_text:
#                     print(f"Form submitted for {persona['name']} - {persona['company']} - {persona['contact']}")
#                     break
#             else:
#                 print("No more buttons found. Exiting loop.")
#                 break

#     except Exception as e:
#         print("Error:", e)

# # Submit the form once for testing
# fill_form()

# # Close the browser
# driver.quit()

indian_personas = [
     {"name": "Arjun Malhotra", "company": "Malhotra & Sons", "contact": "9876543201"},
    {"name": "Bhavika Patel", "company": "Patel Innovations", "contact": "9823456721"},
    {"name": "Chirag Agarwal", "company": "Agarwal Industries", "contact": "9934512331"},
    {"name": "Deepika Nambiar", "company": "Nambiar Textiles", "contact": "9987654341"},
    {"name": "Eshaan Mehta", "company": "Mehta Pvt Ltd", "contact": "9812345681"},
    {"name": "Farah Khan", "company": "Khan & Associates", "contact": "9876134531"},
    {"name": "Gautam Reddy", "company": "Reddy Steel", "contact": "9753124881"},
    {"name": "Hitesh Bansal", "company": "Bansal Exports", "contact": "9887612397"},
    {"name": "Ira Saxena", "company": "Saxena Solutions", "contact": "9965321786"},
    {"name": "Jitendra Deshmukh", "company": "Deshmukh & Co.", "contact": "9998887736"},
    {"name": "Kiran Shah", "company": "Shah Enterprises", "contact": "9856012391"},
    {"name": "Lavanya Pillai", "company": "Pillai Textiles", "contact": "9784561267"},
    {"name": "Mohit Joshi", "company": "Joshi Group", "contact": "9761234815"},
    {"name": "Nandini Chawla", "company": "Chawla Constructions", "contact": "9823456719"},
    {"name": "Omkar Trivedi", "company": "Trivedi Traders", "contact": "9987456222"},
    {"name": "Pranav Kapoor", "company": "Kapoor Automotives", "contact": "9876543092"},
    {"name": "Quresh Alam", "company": "Alam Logistics", "contact": "9812365498"},
    {"name": "Ritika Verma", "company": "Verma & Sons", "contact": "9876123494"},
    {"name": "Siddharth Goenka", "company": "Goenka Industries", "contact": "9823145623"},
    {"name": "Tanisha Menon", "company": "Menon Technologies", "contact": "9934512329"},
    {"name": "Uday Shankar", "company": "Shankar Solutions", "contact": "9987654329"},
    {"name": "Vaishali Gupta", "company": "Gupta Exports", "contact": "9812345699"},
    {"name": "Wasim Shaikh", "company": "Shaikh Builders", "contact": "9876134599"},
    {"name": "Yamini Rao", "company": "Rao Textiles", "contact": "9753124899"},
    {"name": "Zubin Luthra", "company": "Luthra & Co.", "contact": "9887612399"}
]



import random
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Load Chrome WebDriver
driver = webdriver.Chrome()

# Open Google Form
form_url = "https://docs.google.com/forms/d/e/1FAIpQLSf7yAB-7VtV2ISyReOkmOcIRajR9TMT5sgWt_1JzAgWbJqTRg/viewform"
driver.get(form_url)
time.sleep(3)  # Allow time for the page to load


def fill_form(persona):
    try:

        # Fill First Section: Name, Company Name, Contact Number
        text_fields = driver.find_elements(By.CSS_SELECTOR, 'input[type="text"]')
        if len(text_fields) >= 2:
            text_fields[0].send_keys(persona["name"])  # Name
            text_fields[1].send_keys(persona["company"])  # Company Name

        # Fill Contact Number field
        text_fields = driver.find_elements(By.CSS_SELECTOR, 'input[type="tel"], input[type="text"]')
        if len(text_fields) >= 3:
            text_fields[2].send_keys(persona["contact"])  # Contact Number

        # Click Next Button to go to next section
        try:
            next_button = driver.find_element(By.XPATH, "//span[contains(text(),'Next')]")
            next_button.click()
            time.sleep(2)
        except:
            print("No 'Next' button found, moving forward...")

        # Loop through sections
        while True:
            time.sleep(2)  # Wait for section to load

            # Get all radio button groups in the section
            sections = driver.find_elements(By.CSS_SELECTOR, 'div[role="radiogroup"]')

            for section in sections:
                # Get all valid radio buttons in the section
                radio_buttons = section.find_elements(By.CSS_SELECTOR, 'div[role="radio"]')

                # Filter out "Other" option
                valid_options = [rb for rb in radio_buttons if rb.get_attribute("aria-label") and "Other" not in rb.get_attribute("aria-label")]
                
                if valid_options:
                    random.choice(valid_options).click()  # Select a random valid option
                    time.sleep(1)  # Wait between selections

            # Check for "Next" or "Submit" button
            buttons = driver.find_elements(By.XPATH, "//span[contains(text(),'Next')] | //span[contains(text(),'Submit')]")
            if buttons:
                button_text = buttons[0].text.strip()
                
                # Click Next or Submit button
                buttons[0].click()
                time.sleep(2)  
                
                # Stop loop if it's the Submit button
                if "Submit" in button_text:
                    print(f"Form submitted for {persona['name']} - {persona['company']} - {persona['contact']}")
                    break
            else:
                print("No more buttons found. Exiting loop.")
                break

    except Exception as e:
        print("Error:", e)


# Fill form for all personas
for persona in indian_personas:
    fill_form(persona)
    driver.get(form_url)
    time.sleep(3)

# Close browser
driver.quit()

