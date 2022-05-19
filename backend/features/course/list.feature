Feature: List Course
  In order to list course
  As an user
  I need to be able to list Course

  Background:
  Given I have the following data on collection "courses"
  """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Course A",
        "startAt": "Date(2022-03-01)",
        "endAt": "Date(2022-05-01)",
        "enrollments": 2
      }
    ]
    """


  Scenario: List Course whitout filter
    Given I make a request to graphql
    """
    query{
      courseList{
        id
        name
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "courseList": [
          {
            "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
            "name": "Course A"
          }
        ]
      }
    }
    """
    Then response should have a status 200
