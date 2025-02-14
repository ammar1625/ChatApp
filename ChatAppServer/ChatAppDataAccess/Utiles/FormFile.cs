using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;


namespace ChatAppDataAccess.Utiles
{
    
    public class FormFile : IFormFile
    {
        private readonly Stream _stream;
        private readonly string _fileName;
        private readonly string _contentType;

        public FormFile(Stream stream, string fileName, string contentType)
        {
            _stream = stream;
            _fileName = fileName;
            _contentType = contentType;
        }

        public string ContentType => _contentType;
        public string ContentDisposition => $"form-data; name=\"file\"; filename=\"{_fileName}\"";
        public IHeaderDictionary Headers => new HeaderDictionary(); // Empty headers
        public long Length => _stream.Length;
        public string Name => "file"; // Name of the form field
        public string FileName => _fileName;

        public void CopyTo(Stream target)
        {
            _stream.CopyTo(target);
        }

        public Task CopyToAsync(Stream target, System.Threading.CancellationToken cancellationToken = default)
        {
            return _stream.CopyToAsync(target, cancellationToken);
        }

        public Stream OpenReadStream()
        {
            return _stream;
        }
    }
}

