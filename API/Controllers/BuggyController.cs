using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DocfinderContext _context;
        public BuggyController(DocfinderContext context)
        {
            _context = context;
        }

        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<Document> GetNotFound()
        {
            var doc = _context.Documents.Find(-1);

            if (doc == null) return NotFound();

            return doc;
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var doc = _context.Documents.Find(-1);

            var docToReturn = doc?.ToString();

            return docToReturn;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not a good request");
        }
    }
}