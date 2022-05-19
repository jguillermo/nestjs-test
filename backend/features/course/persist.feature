Feature: Persist Course
  In order to create course
  As an user
  I need to be able to persist Course

  Background:
    Given I have the following data on collection "students"
  """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Student A",
        "email": "student@email.com",
        "createAt": "Date(2022-03-01)"
      },
      {
        "id": "00a285d1-e4f0-4ad3-80f9-c306bb4967eb",
        "name": "Student B",
        "email": "student_b@email.com",
        "createAt": "Date(2022-03-02)"
      }
    ]
    """

  Scenario: Create Course
    Given I make a request to graphql
    """
    mutation{
      coursePersist(
        id: "daf673b7-b1ba-415e-ac5e-04848e5e2e5f"
        name: "Course A"
        startAt: "2022-03-01"
        endAt: "2022-05-01"
      ){
        ...on Status{
          status
        }
        ...on Course{
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
        "coursePersist": {
            "status": "ok"
         }
       }
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
        "enrollments": 0
      }
    ]
    """
    And I sleep 4 seconds
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
    And I validate on "enrollments" length is 2

  Scenario: Update Course
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
      coursePersist(
        id: "daf673b7-b1ba-415e-ac5e-04848e5e2e5f"
        name: "Course B"
        startAt: "2022-03-01"
        endAt: "2022-05-01"
      ){
        ...on Status{
          status
        }
        ...on Course{
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
        "coursePersist": {
            "status": "ok"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "courses"
    """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Course B",
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