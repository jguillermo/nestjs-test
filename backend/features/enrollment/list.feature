Feature: List Enrollment
  In order to list enrollment
  As an user
  I need to be able to list Enrollment

  Background:
  Given I have the following data on collection "enrollments"
  """
  [
    {
      "id": "7f26fdbb-a878-4290-b442-a85a51cd3626",
      "course": "5136f1cb-f635-47b1-a083-98148c1235ee",
      "student": "795eabf8-f98f-462e-b358-b66c69abc7e5"
    },
    {
      "id": "7f26fdbb-a878-4290-b442-a85a51cd3627",
      "course": "5136f1cb-f635-47b1-a083-98148c1234ee",
      "student": "795eabf8-f98f-462e-b358-b66c69abc7e6"
    },
    {
      "id": "7f26fdbb-a878-4290-b442-a85a51cd3628",
      "course": "5136f1cb-f635-47b1-a083-98148c1234ee",
      "student": "795eabf8-f98f-462e-b358-b66c69abc7e7"
    }
  ]
  """
  And I have the following data on collection "students"
  """
    [
      {
        "id": "795eabf8-f98f-462e-b358-b66c69abc7e5",
        "name": "Student A",
        "email": "studenta@email.com",
        "createAt": "Date(2022-03-01)"
      },
      {
        "id": "795eabf8-f98f-462e-b358-b66c69abc7e6",
        "name": "Student B",
        "email": "studentb@email.com",
        "createAt": "Date(2022-03-01)"
      },
      {
        "id": "795eabf8-f98f-462e-b358-b66c69abc7e7",
        "name": "Student C",
        "email": "studentc@email.com",
        "createAt": "Date(2022-03-01)"
      }
    ]
    """

  Scenario: List Enrollment course filter
    Given I make a request to graphql
    """
    query{
      enrollmentList(course:"5136f1cb-f635-47b1-a083-98148c1234ee"){
        id
        studentId
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "enrollmentList": [
          {
            "id": "7f26fdbb-a878-4290-b442-a85a51cd3627",
            "studentId": "795eabf8-f98f-462e-b358-b66c69abc7e6"
          },
          {
            "id": "7f26fdbb-a878-4290-b442-a85a51cd3628",
            "studentId": "795eabf8-f98f-462e-b358-b66c69abc7e7"
          }
        ]
      }
    }
    """
    Then response should have a status 200


  Scenario: List Enrollment course filter with student data
    Given I make a request to graphql
    """
    query{
      enrollmentList(course:"5136f1cb-f635-47b1-a083-98148c1234ee"){
        id
        studentId
        student{
          id
          name
        }
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "enrollmentList": [
          {
            "id": "7f26fdbb-a878-4290-b442-a85a51cd3627",
            "studentId": "795eabf8-f98f-462e-b358-b66c69abc7e6",
            "student": {
              "id": "795eabf8-f98f-462e-b358-b66c69abc7e6",
              "name": "Student B"
            }
          },
          {
            "id": "7f26fdbb-a878-4290-b442-a85a51cd3628",
            "studentId": "795eabf8-f98f-462e-b358-b66c69abc7e7",
            "student": {
              "id": "795eabf8-f98f-462e-b358-b66c69abc7e7",
              "name": "Student C"
            }
          }
        ]
      }
    }
    """
    Then response should have a status 200