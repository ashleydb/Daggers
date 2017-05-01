var expect = require('expect');

//Visually grouping tests
describe('Routes: News', () => {
  //Example of an individual test
  it('should properly run tests', () => {
    expect(1).toBe(1);
  });

  it('should create a news story', () => {
    // create a news story (accessed at POST http://localhost:8080/api/v1/news)
    // User must be authenticated as an admin.
    expect(0).toBe(1);
  });

  it('should get all the news and ids', () => {
    // get all the news (accessed at GET http://localhost:8080/api/v1/news) or a list of years/months/ids
    //  Can send listIDs = [true|false] as a body parameter.
    // No authentication required.
    expect(0).toBe(1);
  });

  it('should get a years news and ids', () => {
    // get all the news (accessed at GET http://localhost:8080/api/v1/news/:year) or a list of months/ids
    //  Can send listIDs = [true|false] as a body parameter.
    // No authentication required.
    expect(0).toBe(1);
  });

  it('should get a months news and ids', () => {
    // get all the news (accessed at GET http://localhost:8080/api/v1/news/:year/:month) or a list of ids
    //  Can send listIDs = [true|false] as a body parameter.
    // No authentication required.
    expect(0).toBe(1);
  });

  it('should get a news story', () => {
    // get the news story with that id (accessed at GET http://localhost:8080/api/v1/news/:year/:month/:news_id)
    // No authentication required.
    expect(0).toBe(1);
  });

  it('should update a news story', () => {
    // update the news with this id (accessed at PUT http://localhost:8080/api/v1/news/:year/:month/:news_id)
    // User must be authenticated as an admin.
    expect(0).toBe(1);
  });

  it('should delete a news story', () => {
    // delete the news with this id (accessed at DELETE http://localhost:8080/api/v1/news/:year/:month/:news_id)
    // User must be authenticated as an admin.
    expect(0).toBe(1);
  });
})
