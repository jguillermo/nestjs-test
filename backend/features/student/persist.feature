Feature: Persist Student
  In order to create student
  As an user
  I need to be able to persist student

  Scenario: Create Student
    Given I make a request to graphql
    """
    mutation{
      studentPersist(
        id: "daf673b7-b1ba-415e-ac5e-04848e5e2e5f"
        name: "Student A"
        email: "student@email.com"
        createAt: "2022-03-01"
      ){
        ...on Status{
          status
        }
        ...on Student{
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
        "studentPersist": {
            "status": "ok"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "students"
    """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Student A",
        "email": "student@email.com",
        "createAt": {
          "_nanoseconds": 0,
          "_seconds": 1646092800
        }
      }
    ]
    """