Feature: Delete Enrollment
  In order to delete enrollment
  As an user
  I need to be able to delete Enrollment

  Background:
  Given I have the following data on collection "enrollments"
  """
  [
    {
      "id": "7f26fdbb-a878-4290-b442-a85a51cd3628",
      "course": "5136f1cb-f635-47b1-a083-98148c1234ee",
      "student": "795eabf8-f98f-462e-b358-b66c69abc7e7"
    }
  ]
  """
  And I have the following data on collection "courses"
  """
  [
    {
      "id": "5136f1cb-f635-47b1-a083-98148c1234ee",
      "name": "Course A",
      "startAt": "Date(2022-03-01)",
      "endAt": "Date(2022-05-01)",
      "enrollments": 1
    }
  ]
  """


  Scenario: delete one enrollment
    Given I make a request to graphql
    """
    mutation{
      enrollmentDelete(id:"7f26fdbb-a878-4290-b442-a85a51cd3628"){
        status
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "enrollmentDelete": {
            "status": "ok"
         }
      }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "enrollments"
    """
    [
    ]
    """
    And I sleep 3 seconds
    And I validate the following data exists on collection "courses"
    """
    [
      {
        "id": "5136f1cb-f635-47b1-a083-98148c1234ee",
        "name": "Course A",
        "startAt": {
          "_nanoseconds": 0,
          "_seconds": 1646092800
        },
        "endAt": {
           "_nanoseconds": 0,
           "_seconds": 1651363200
        },
        "enrollments": 0
      }
    ]
    """

