Feature: Delete Course
  In order to delete course
  As an user
  I need to be able to delete Course

  Scenario: delete one course without enrollment
  Given I have the following data on collection "courses"
  """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Course A",
        "startAt": "Date(2022-03-01)",
        "endAt": "Date(2022-05-01)",
        "enrollments": 0
      }
    ]
    """
    And I make a request to graphql
    """
    mutation{
      courseDelete(id:"daf673b7-b1ba-415e-ac5e-04848e5e2e5f"){
        status
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "courseDelete": {
            "status": "ok"
         }
      }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "courses"
    """
    [
    ]
    """

  Scenario: delete one course with enrollment
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
    And I make a request to graphql
    """
    mutation{
      courseDelete(id:"daf673b7-b1ba-415e-ac5e-04848e5e2e5f"){
        status
      }
    }
    """
    And I validate the response is
    """
    {
      "data": null,
      "errors": [
        {
          "extensions": {
            "code": "BAD_USER_INPUT",
            "response": {
              "error": "Bad Request",
              "message": "there are students enrolled",
              "statusCode": 400
            }
          },
          "message": "there are students enrolled"
        }
      ]
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "courses"
    """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Course A",
        "startAt": {
          "_nanoseconds": 0,
          "_seconds": 1646092800
        },
        "endAt": {
           "_nanoseconds": 0,
           "_seconds": 1651363200
        },
        "enrollments": 2
      }
    ]
    """