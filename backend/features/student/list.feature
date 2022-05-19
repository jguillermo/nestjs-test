Feature: List Student
  In order to list student
  As an user
  I need to be able to list Student

  Background:
  Given I have the following data on collection "students"
  """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Student A",
        "email": "student@email.com",
        "createAt": "Date(2022-03-01)"
      }
    ]
    """


  Scenario: List Student whitout filter
    Given I make a request to graphql
    """
    query{
      studentList{
        id
        name
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "studentList": [
          {
            "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
            "name": "Student A"
          }
        ]
      }
    }
    """
    Then response should have a status 200
